import { createMemo, createSignal, For, Show } from "solid-js";
import { useSearch } from "#hooks/use-search";

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

export const DocsSidebar = (props: DocsSidebarProps) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  const searchResults = useSearch(() => getItemsForSearch(props.sections), searchTerm, {
    keys: ["sectionTitle", "title"],
    threshold: 0.2,
  });

  const visibleSections = createMemo(() =>
    props.isSearchable ? getSectionsMatchingSearchResults(props.sections, searchResults()) : props.sections,
  );

  return (
    <nav aria-label="Documentation">
      <Show when={props.isSearchable ?? false}>
        <input type="text" onInput={(e) => setSearchTerm(e.target.value)} />
      </Show>
      <For each={visibleSections()}>
        {(section) => (
          <>
            <h1>{section.title}</h1>
            <ul>
              <For each={section.items}>
                {(item) => (
                  <li>
                    <a href={item.href}>{item.title}</a>
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </For>
    </nav>
  );
};
