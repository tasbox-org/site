import { createAsync, query, redirect } from "@solidjs/router";
import { allLibraries, type Library } from "@tasbox-org/docs";
import type { DocsSidebarItem, DocsSidebarSection } from "#components/docs/sidebar";

const getDocLibrary = query(async (libraryName: string): Promise<Library> => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    throw redirect("/404", { status: 404 });
  }

  return library;
}, "docLibrary");

interface MapToSectionProps<TItem> {
  library: Library;
  section: TItem[] | undefined;
  sectionTitle: string;
  itemUrlPrefix: string;
  itemTitleSelector: (item: TItem) => string;
}

const mapToSection = <TItem>({
  library,
  section,
  sectionTitle,
  itemUrlPrefix,
  itemTitleSelector,
}: MapToSectionProps<TItem>): DocsSidebarSection[] => {
  return section === undefined
    ? []
    : [
        {
          title: sectionTitle,
          items: section.map((item): DocsSidebarItem => {
            const title = itemTitleSelector(item);

            return {
              title: title,
              href: `/docs/api/${library.name}/${itemUrlPrefix}/${title}`,
            };
          }),
        },
      ];
};

const mapToCustomSections = <TItem extends { name: string; section?: string }>(
  library: Library,
  items: TItem[] | undefined,
  baseTitle: string,
  urlPrefix: string,
): DocsSidebarSection[] => {
  const itemsBySection: Record<string, TItem[]> = {};
  const itemsWithNoSection: TItem[] = [];

  for (const item of items ?? []) {
    if (item.section === undefined) {
      itemsWithNoSection.push(item);
    } else {
      itemsBySection[item.section] = itemsBySection[item.section] ?? [];

      // biome-ignore lint/style/noNonNullAssertion: Guaranteed to exist above
      itemsBySection[item.section]!.push(item);
    }
  }

  return [
    ...mapToSection({
      library,
      section: itemsWithNoSection,
      sectionTitle: baseTitle,
      itemUrlPrefix: urlPrefix,
      itemTitleSelector: (item) => item.name,
    }),
    ...Object.entries(itemsBySection).flatMap(([sectionTitle, section]) =>
      mapToSection({
        library,
        section,
        sectionTitle: `${baseTitle} - ${sectionTitle}`,
        itemUrlPrefix: urlPrefix,
        itemTitleSelector: (item) => item.name,
      }),
    ),
  ];
};

export const useDocLibrary = (libraryName: () => string) => createAsync<Library>(() => getDocLibrary(libraryName()));

export const useDocLibrarySidebarSections = (libraryName: () => string) =>
  createAsync<DocsSidebarSection[]>(async () => {
    const library = await getDocLibrary(libraryName());

    return [
      ...mapToSection({
        library,
        section: library.constants,
        sectionTitle: "Constants",
        itemUrlPrefix: "constant",
        itemTitleSelector: (item) => item.name.toString(),
      }),
      ...mapToCustomSections(library, library.functions, "Functions", "function"),
      ...mapToSection({
        library,
        section: library.enums,
        sectionTitle: "Enums",
        itemUrlPrefix: "enum",
        itemTitleSelector: (item) => item.name,
      }),
      ...mapToSection({
        library,
        section: library.classes,
        sectionTitle: "Classes",
        itemUrlPrefix: "class",
        itemTitleSelector: (item) => item.name,
      }),
      ...mapToCustomSections(library, library.events, "Events", "event"),
    ];
  });
