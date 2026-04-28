import { allLibraries, type Library } from "@tasbox-org/docs";
import uniqBy from "lodash/uniqBy";
import type { DocsSidebarItem } from "#components/docs/sidebar";
import type { IconName } from "#components/icons";
import { whereNotNull } from "#helpers/where-not-null";

interface MapToSectionProps<TItem> {
  library: Library;
  items: TItem[] | undefined;
  icon: IconName;
  pathSegment: string;
}

const mapToDocItems = <TItem extends { name: string | number; section?: string }>({
  library,
  items,
  icon,
  pathSegment,
}: MapToSectionProps<TItem>): DocsSidebarItem[] => {
  if (items === undefined) {
    return [];
  }

  const allSidebarItems = items.map((item): DocsSidebarItem => {
    const title = item.name.toString();

    return {
      icon,
      breadcrumbs: whereNotNull([library.name, item.section, title]),
      href: `/docs/api/${library.name}/${pathSegment}/${title}`,
    };
  });

  return uniqBy(allSidebarItems, (item) => item.breadcrumbs.join("."));
};

export const useDocSidebarApiItems = (): DocsSidebarItem[] =>
  allLibraries.flatMap((library): DocsSidebarItem[] => [
    {
      icon: "documentation",
      breadcrumbs: [library.name, "Overview"],
      href: `/docs/api/${library.name}`,
    },
    ...mapToDocItems({
      library,
      items: library.constants,
      icon: "constant",
      pathSegment: "constant",
    }),
    ...mapToDocItems({
      library,
      items: library.functions,
      icon: "function",
      pathSegment: "function",
    }),
    ...mapToDocItems({
      library,
      items: library.enums,
      icon: "enum",
      pathSegment: "enum",
    }),
    ...mapToDocItems({
      library,
      items: library.classes,
      icon: "class",
      pathSegment: "class",
    }),
    ...mapToDocItems({
      library,
      items: library.events,
      icon: "event",
      pathSegment: "event",
    }),
  ]);
