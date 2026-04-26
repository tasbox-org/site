import { useMatch } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import { useSearch } from "#hooks/use-search";
import styles from "./sidebar.module.css";

export type DocsSidebarItemType = "constant" | "function" | "enum" | "class" | "event" | "document";

export interface DocsSidebarItem {
  type: DocsSidebarItemType;
  breadcrumbs: readonly string[];
  href: string;
}

export interface DocsSidebarProps {
  variant: "primary" | "secondary";
  matchUrl: string;
  guides: readonly DocsSidebarItem[];
  api: readonly DocsSidebarItem[];
}

const getVariantClass = (variant: "primary" | "secondary") => {
  switch (variant) {
    case "primary":
      return styles.primary;
    case "secondary":
      return styles.secondary;
  }
};

// const ListItem = (props: DocsSidebarItem) => {
//   const match = useMatch(() => `${props.href}/*`);
//
//   return (
//     <li class={`${styles.listItem} ${match() ? styles.active : ""}`}>
//       <a class={styles.link} href={props.href}>
//         {props.title}
//       </a>
//       <div class={styles.listItemPseudoAnchor} />
//     </li>
//   );
// };

const UnfilteredDocsItems = (props: { items: readonly DocsSidebarItem[] }) => {
  const leafItems = createMemo(() => props.items.filter((item) => item.breadcrumbs.length === 1));
  const groupedItems = createMemo(() => {
    const grouped = Object.groupBy(
      props.items.filter((item) => item.breadcrumbs.length > 1),
      // biome-ignore lint/style/noNonNullAssertion: Length guaranteed by filter
      (item) => item.breadcrumbs[0]!,
    );

    return Object.entries(grouped)
      .map(([key, values]): { key: string; values: DocsSidebarItem[] } => ({
        key,
        values: values?.map((value) => ({ ...value, breadcrumbs: value.breadcrumbs.slice(1) })) ?? [],
      }))
      .filter(({ values }) => values.length > 0)
      .toSorted((a, b) => a.key.localeCompare(b.key));
  });

  return (
    <ul>
      <For each={groupedItems()}>
        {(group) => (
          <li>
            <div>{group.key}</div>
            <UnfilteredDocsItems items={group.values} />
          </li>
        )}
      </For>
      <For each={leafItems()}>
        {(item) => (
          <li>
            {item.type} {item.breadcrumbs[0]}
          </li>
        )}
      </For>
    </ul>
  );
};

const FilteredDocsItems = (props: { items: readonly DocsSidebarItem[] }) => (
  <ol>
    <For each={props.items}>
      {(item) => (
        <li>
          {item.type} {item.breadcrumbs.join(" > ")}
        </li>
      )}
    </For>
  </ol>
);

const Group = (props: {
  heading: string;
  allItems: readonly DocsSidebarItem[];
  searchResults: readonly DocsSidebarItem[];
  hasSearchTerm: boolean;
}) => (
  <div>
    <h1>{props.heading}</h1>
    <Show when={props.hasSearchTerm} fallback={<UnfilteredDocsItems items={props.allItems} />}>
      <FilteredDocsItems items={props.searchResults} />
    </Show>
  </div>
);

export const DocsSidebar = (props: DocsSidebarProps) => {
  const match = useMatch(() => props.matchUrl);

  const [searchTerm, setSearchTerm] = createSignal("");
  const hasSearchTerm = () => searchTerm().trim().length > 0;

  const guideResults = useSearch(() => props.guides, searchTerm, {
    keys: ["type", "breadcrumbs"],
    threshold: 0.6,
  });
  const apiResults = useSearch(() => props.api, searchTerm, {
    keys: ["type", "breadcrumbs"],
    threshold: 0.6,
  });

  return (
    <nav
      aria-label="Documentation"
      class={`${styles.container} ${getVariantClass(props.variant)} ${match() ? styles.anyActive : ""}`}
    >
      <div class={styles.search}>
        <input type="text" placeholder="Search..." onInput={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div class={styles.scroll}>
        <Group
          heading="Guides"
          allItems={props.guides}
          searchResults={guideResults()}
          hasSearchTerm={hasSearchTerm()}
        />
        <Group heading="API" allItems={props.api} searchResults={apiResults()} hasSearchTerm={hasSearchTerm()} />
      </div>
    </nav>
  );
};
