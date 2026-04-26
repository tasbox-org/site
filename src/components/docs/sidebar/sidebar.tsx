import { useMatch } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import { Breadcrumbs } from "#components/docs/breadcrumbs";
import type { IconName } from "#components/icons";
import { useSearch } from "#hooks/use-search";
import styles from "./sidebar.module.css";

export interface DocsSidebarItem {
  icon: IconName;
  breadcrumbs: readonly string[];
  href: string;
}

export interface DocsSidebarProps {
  matchUrl: string;
  guides: readonly DocsSidebarItem[];
  api: readonly DocsSidebarItem[];
}

const LeafListItem = (props: DocsSidebarItem) => {
  const match = useMatch(() => props.href);

  return (
    <li class={`${styles.listItem} ${match() ? styles.active : ""}`}>
      <a class={styles.link} href={props.href}>
        <Breadcrumbs icon={props.icon} segments={props.breadcrumbs} />
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
            <details class={styles.details}>
              <summary>{group.key}</summary>
              <div class={styles.detailsContents}>
                <UnfilteredDocsItems items={group.values} />
              </div>
            </details>
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

const Group = (props: { heading: string; allItems: readonly DocsSidebarItem[]; searchTerm: string }) => {
  const hasSearchTerm = () => props.searchTerm.trim().length > 0;

  const searchResults = useSearch(
    () => props.allItems,
    () => props.searchTerm,
    {
      useTokenSearch: true,
      keys: ["icon", "breadcrumbs"],
      threshold: 0.3,
    },
  );

  const hasResults = () => !hasSearchTerm() || searchResults().length > 0;

  return (
    <Show when={hasResults()}>
      <div class={styles.group}>
        <h1 class={styles.groupHeader}>{props.heading}</h1>
        <div class={styles.groupItems}>
          <Show when={hasSearchTerm()} fallback={<UnfilteredDocsItems items={props.allItems} />}>
            <FilteredDocsItems items={searchResults()} />
          </Show>
        </div>
      </div>
    </Show>
  );
};

export const DocsSidebar = (props: DocsSidebarProps) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  return (
    <nav aria-label="Documentation" class={styles.container}>
      <div class={styles.search}>
        <input type="text" placeholder="Search..." onInput={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div class={styles.scroll}>
        <div class={styles.groups}>
          <Group heading="Guides" allItems={props.guides} searchTerm={searchTerm()} />
          <Group heading="API" allItems={props.api} searchTerm={searchTerm()} />
        </div>
      </div>
    </nav>
  );
};
