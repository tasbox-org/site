import { useLocation } from "@solidjs/router";
import { createMemo, type ParentProps } from "solid-js";
import { Breadcrumbs } from "#components/docs/breadcrumbs";
import { DocsSidebar } from "#components/docs/sidebar";
import { useDocSidebarApiItems } from "#hooks/use-doc-sidebar-items";
import styles from "./docs.module.css";

const DocsLayout = (props: ParentProps) => {
  const location = useLocation();
  const apiItems = useDocSidebarApiItems();

  const activeItem = createMemo(() => apiItems.find((item) => item.href === location.pathname));

  return (
    <div class={styles.container}>
      <DocsSidebar
        matchUrl="/docs/:any/*"
        guides={[{ icon: "documentation", breadcrumbs: ["TODO"], href: "#" }]}
        api={apiItems}
      />
      <div class={styles.contents}>
        <div class={styles.breadcrumbs}>
          <Breadcrumbs icon={activeItem()?.icon} segments={activeItem()?.breadcrumbs ?? []} />
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default DocsLayout;
