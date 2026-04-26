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
  matchUrl: string;
  guides: readonly DocsSidebarItem[];
  api: readonly DocsSidebarItem[];
}

const LeafListItem = (props: DocsSidebarItem) => {
  const match = useMatch(() => `${props.href}/*`);

  const prefix = () => props.breadcrumbs.slice(0, props.breadcrumbs.length).join(" > ");
  const hasPrefix = () => prefix().length > 0;

  return (
    <li class={`${styles.listItem} ${match() ? styles.active : ""}`}>
      <a class={styles.link} href={props.href}>
        {props.type}{" "}
        <Show when={hasPrefix()}>
          {prefix()}
          {" > "}
        </Show>{" "}
        {props.breadcrumbs.at(-1)}
      </a>
    </li>
  );
};

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
    <ul class={styles.list}>
      <For each={groupedItems()}>
        {(group) => (
          <li class={styles.list}>
            <div>{group.key}</div>
            <UnfilteredDocsItems items={group.values} />
          </li>
        )}
      </For>
      <For each={leafItems()}>{(item) => <LeafListItem {...item} />}</For>
    </ul>
  );
};

const FilteredDocsItems = (props: { items: readonly DocsSidebarItem[] }) => (
  <ol class={styles.list}>
    <For each={props.items}>{(item) => <LeafListItem {...item} />}</For>
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
    <nav aria-label="Documentation" class={styles.container}>
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
