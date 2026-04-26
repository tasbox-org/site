import { allLibraries, type Library } from "@tasbox-org/docs";
import type { DocsSidebarItem, DocsSidebarItemType } from "#components/docs/sidebar";
import { whereNotNull } from "#helpers/where-not-null";

interface MapToSectionProps<TItem> {
  library: Library;
  items: TItem[] | undefined;
  itemType: DocsSidebarItemType;
}

const mapToDocItems = <TItem extends { name: string | number; section?: string }>({
  library,
  items,
  itemType,
}: MapToSectionProps<TItem>): DocsSidebarItem[] =>
  items?.map((item): DocsSidebarItem => {
    const title = item.name.toString();

    return {
      type: itemType,
      breadcrumbs: whereNotNull([library.name, item.section, title]),
      href: `/docs/api/${library.name}/${itemType}/${title}`,
    };
  }) ?? [];

export const useDocSidebarApiItems = (): DocsSidebarItem[] =>
  allLibraries.flatMap((library): DocsSidebarItem[] => [
    ...mapToDocItems({
      library,
      items: library.constants,
      itemType: "constant",
    }),
    ...mapToDocItems({
      library,
      items: library.functions,
      itemType: "function",
    }),
    ...mapToDocItems({
      library,
      items: library.enums,
      itemType: "enum",
    }),
    ...mapToDocItems({
      library,
      items: library.classes,
      itemType: "class",
    }),
    ...mapToDocItems({
      library,
      items: library.events,
      itemType: "event",
    }),
  ]);
