import type { ParentProps } from "solid-js";
import { DocsSidebar } from "#components/docs/sidebar";
import { useDocSidebarApiItems } from "#hooks/use-doc-sidebar-items";
import styles from "./docs.module.css";

const DocsLayout = (props: ParentProps) => {
  const apiItems = useDocSidebarApiItems();

  return (
    <div class={styles.container}>
      <DocsSidebar
        matchUrl="/docs/:any/*"
        guides={[{ icon: "documentation", breadcrumbs: ["TODO"], href: "#" }]}
        api={apiItems}
      />
      {props.children}
    </div>
  );
};

export default DocsLayout;
