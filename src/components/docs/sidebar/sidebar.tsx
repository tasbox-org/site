import { createMemo, createSignal, For, Show } from "solid-js";

export interface DocsSidebarItem {
  title: string;
  href: string;
}

export interface DocsSidebarSection {
  title: string;
  items: DocsSidebarItem[];
}

export interface DocsSidebarProps {
  level: "primary" | "secondary";
  isSearchable?: boolean;
  sections: DocsSidebarSection[];
}

export const DocsSidebar = (props: DocsSidebarProps) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  const visibleSections = createMemo(() => {
    if (!props.isSearchable) {
      return props.sections;
    }

    const normalisedSearchTerm = searchTerm().trim().toLowerCase();

    return props.sections
      .map((section) => {
        if (section.title.toLowerCase().includes(normalisedSearchTerm)) {
          return section;
        }

        const filteredItems = section.items.filter((item) => item.title.toLowerCase().includes(normalisedSearchTerm));

        return { ...section, items: filteredItems };
      })
      .filter((section) => section.items.length > 0);
  });

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
