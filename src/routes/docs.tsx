import { useLocation } from "@solidjs/router";
import { createMemo, type ParentProps } from "solid-js";
import { MaxContentWidth } from "#components/common/max-content-width";
import { Metadata } from "#components/common/metadata";
import { Sidebar, type SidebarGroup } from "#components/common/sidebar";
import { Breadcrumbs } from "#components/docs/breadcrumbs";
import { useDocSidebarApiItems, useDocSidebarGuideItems } from "#hooks/use-doc-sidebar-items";
import styles from "./docs.module.css";

const DocsLayout = (props: ParentProps) => {
  const location = useLocation();

  const guideItems = useDocSidebarGuideItems();
  const apiItems = useDocSidebarApiItems();
  const groups: SidebarGroup[] = [
    {
      heading: "Guides",
      items: guideItems,
    },
    {
      heading: "API",
      items: apiItems,
    },
  ];

  const activeItem = createMemo(() => [...guideItems, ...apiItems].find((item) => item.href === location.pathname));

  return (
    <MaxContentWidth>
      <Metadata
        type="website"
        title={activeItem()?.breadcrumbs.join(" - ") ?? ""}
        description="TASBox guides & API documentation"
        url={location.pathname as `/${string}`}
      />
      <div class={styles.container}>
        <aside>
          <Sidebar groups={groups} />
        </aside>
        <div class={styles.contents}>
          <div class={styles.breadcrumbs}>
            <Breadcrumbs icon={activeItem()?.icon} segments={activeItem()?.breadcrumbs ?? []} />
          </div>
          {props.children}
        </div>
      </div>
    </MaxContentWidth>
  );
};

export default DocsLayout;
