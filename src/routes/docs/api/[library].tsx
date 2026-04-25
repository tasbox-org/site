import { type RouteSectionProps, useParams } from "@solidjs/router";
import { DocsSidebar } from "#components/docs/sidebar";
import { useDocLibrarySidebarSections } from "#hooks/use-doc-library";
import type { PathParams } from "#types/path-params";

const LibraryLayout = (props: RouteSectionProps) => {
  const params = useParams<PathParams["/api/[library]"]>();
  const sidebarSections = useDocLibrarySidebarSections(() => params.library);

  return (
    <>
      <DocsSidebar level="secondary" isSearchable sections={sidebarSections() ?? []} />
      {props.children}
    </>
  );
};

export default LibraryLayout;
