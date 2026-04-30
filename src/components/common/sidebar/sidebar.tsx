import { useMatch } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import { Breadcrumbs } from "#components/docs/breadcrumbs";
import type { IconName } from "#components/icons";
import { useSearch } from "#hooks/use-search";
import styles from "./sidebar.module.css";

export interface SidebarItem {
  icon?: IconName;
  breadcrumbs: readonly string[];
  href: string;
}

export interface SidebarGroup {
  heading: string;
  items: readonly SidebarItem[];
}

export interface SidebarProps {
  groups: readonly SidebarGroup[];
}

const LeafListItem = (props: SidebarItem) => {
  const match = useMatch(() => props.href);

  return (
    <li class={`${styles.listItem} ${match() ? styles.active : ""}`}>
      <a class={styles.link} href={props.href}>
        <Breadcrumbs icon={props.icon} segments={props.breadcrumbs} />
      </a>
    </li>
  );
};

const UnfilteredItems = (props: { items: readonly SidebarItem[] }) => {
  const leafItems = createMemo(() => props.items.filter((item) => item.breadcrumbs.length === 1));
  const groupedItems = createMemo(() => {
    const grouped = Object.groupBy(
      props.items.filter((item) => item.breadcrumbs.length > 1),
      // biome-ignore lint/style/noNonNullAssertion: Length guaranteed by filter
      (item) => item.breadcrumbs[0]!,
    );

    return Object.entries(grouped)
      .map(([key, values]): { key: string; values: SidebarItem[] } => ({
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
                <UnfilteredItems items={group.values} />
              </div>
            </details>
          </li>
        )}
      </For>
      <For each={leafItems()}>{(item) => <LeafListItem {...item} />}</For>
    </ul>
  );
};

const FilteredItems = (props: { items: readonly SidebarItem[] }) => (
  <ol class={styles.list}>
    <For each={props.items}>{(item) => <LeafListItem {...item} />}</For>
  </ol>
);

const Group = (props: { heading: string; allItems: readonly SidebarItem[]; searchTerm: string }) => {
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
          <Show when={hasSearchTerm()} fallback={<UnfilteredItems items={props.allItems} />}>
            <FilteredItems items={searchResults()} />
          </Show>
        </div>
      </div>
    </Show>
  );
};

export const Sidebar = (props: SidebarProps) => {
  const [searchTerm, setSearchTerm] = createSignal("");

  return (
    <nav aria-label="Sidebar" class={styles.container}>
      <div class={styles.search}>
        <input type="text" placeholder="Search..." onInput={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div class={styles.scroll}>
        <div class={styles.groups}>
          <For each={props.groups}>
            {(group) => <Group heading={group.heading} allItems={group.items} searchTerm={searchTerm()} />}
          </For>
        </div>
      </div>
    </nav>
  );
};
