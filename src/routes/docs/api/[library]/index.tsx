import { useParams } from "@solidjs/router";
import { useDocLibrary } from "#hooks/use-doc-library";
import type { PathParams } from "#types/path-params";

const LibraryPage = () => {
  const params = useParams<PathParams["/api/[library]"]>();
  const library = useDocLibrary(() => params.library);

  return <div>Library: {JSON.stringify(library(), null, 2)}</div>;
};

export default LibraryPage;
