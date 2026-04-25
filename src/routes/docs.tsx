import { allLibraries } from "@tasbox-org/docs";
import type { ParentProps } from "solid-js";
import { DocsSidebar } from "#components/docs/sidebar";
import style from "./docs.module.css";

const DocsLayout = (props: ParentProps) => (
  <div class={style.container}>
    <DocsSidebar
      variant="primary"
      sections={[
        {
          title: "Guides",
          items: [{ title: "TODO", href: "#" }],
        },
        {
          title: "API",
          items: allLibraries.map((library) => ({ title: library.name, href: `/docs/api/${library.name}` })),
        },
      ]}
    />
    {props.children}
  </div>
);

export default DocsLayout;
