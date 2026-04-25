import { For } from "solid-js";

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
  sections: DocsSidebarSection[];
}

export const DocsSidebar = (props: DocsSidebarProps) => (
  <nav aria-label="Documentation">
    <For each={props.sections}>
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
