import { useMatch } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import { useSearch } from "#hooks/use-search";
import styles from "./sidebar.module.css";

export interface DocsSidebarItem {
  title: string;
  href: string;
}

export interface DocsSidebarSection {
  title: string;
  items: readonly DocsSidebarItem[];
}

export interface DocsSidebarProps {
  variant: "primary" | "secondary";
  isSearchable?: boolean;
  matchUrl: string;
  sections: readonly DocsSidebarSection[];
}

interface SearchableItem extends DocsSidebarItem {
  sectionTitle: string;
}

const getItemsForSearch = (sections: readonly DocsSidebarSection[]): readonly SearchableItem[] =>
  sections.flatMap((section) => section.items.map((item) => ({ sectionTitle: section.title, ...item })));

const getSectionsMatchingSearchResults = (
  sections: readonly DocsSidebarSection[],
  results: readonly SearchableItem[],
) => {
  const resultsBySection = Object.groupBy(results, (result) => result.sectionTitle);

  return sections
    .map((section) => {
      if (!resultsBySection[section.title]) {
        return undefined;
      }

      return { ...section, items: resultsBySection[section.title] };
    })
    .filter((section) => section !== undefined);
};

const getVariantClass = (variant: "primary" | "secondary") => {
  switch (variant) {
    case "primary":
      return styles.primary;
    case "secondary":
      return styles.secondary;
  }
};

const ListItem = (props: DocsSidebarItem) => {
  const match = useMatch(() => `${props.href}/*`);

  return (
    <li class={`${styles.listItem} ${match() ? styles.active : ""}`}>
      <a class={styles.link} href={props.href}>
        {props.title}
      </a>
      <div class={styles.listItemPseudoAnchor} />
    </li>
  );
};

export const DocsSidebar = (props: DocsSidebarProps) => {
  const match = useMatch(() => props.matchUrl);

  const [searchTerm, setSearchTerm] = createSignal("");

  const searchResults = useSearch(() => getItemsForSearch(props.sections), searchTerm, {
    keys: ["sectionTitle", "title"],
    threshold: 0.2,
  });

  const visibleSections = createMemo(() =>
    props.isSearchable ? getSectionsMatchingSearchResults(props.sections, searchResults()) : props.sections,
  );

  // TODO: Merge all docs into a single searchable sidebar
  return (
    <nav
      aria-label="Documentation"
      class={`${styles.container} ${getVariantClass(props.variant)} ${match() ? styles.anyActive : ""}`}
    >
      <Show when={props.isSearchable ?? false}>
        <div class={styles.search}>
          <input type="text" placeholder="Search..." onInput={(e) => setSearchTerm(e.target.value)} />
        </div>
      </Show>
      <div class={styles.scroll}>
        <For each={visibleSections()}>
          {(section) => (
            <>
              <h1 class={styles.sectionTitle}>{section.title}</h1>
              <ul class={styles.list}>
                <For each={section.items}>{(item) => <ListItem {...item} />}</For>
              </ul>
            </>
          )}
        </For>
      </div>
    </nav>
  );
};
