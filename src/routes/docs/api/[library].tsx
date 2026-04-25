import { type RouteSectionProps, useParams } from "@solidjs/router";
import { DocsSidebar } from "#components/docs/sidebar";
import { useDocLibrarySidebarSections } from "#hooks/use-doc-library";
import type { PathParams } from "#types/path-params";
import styles from "./[library].module.css";

const LibraryLayout = (props: RouteSectionProps) => {
  const params = useParams<PathParams["/api/[library]"]>();
  const sidebarSections = useDocLibrarySidebarSections(() => params.library);

  return (
    <>
      <DocsSidebar
        variant="secondary"
        isSearchable
        matchUrl="/docs/api/:library/:any/*"
        sections={sidebarSections() ?? []}
      />
      <div class={styles.container}>{props.children}</div>
    </>
  );
};

export default LibraryLayout;
