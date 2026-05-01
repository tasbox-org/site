import { useParams } from "@solidjs/router";
import { Description } from "#components/docs/description";
import { useDocLibrary } from "#hooks/use-doc-library";
import type { PathParams } from "#types/path-params";

const LibraryPage = () => {
  const params = useParams<PathParams["/api/[library]"]>();
  const library = useDocLibrary(() => params.library);

  return (
    <div>
      <h1>{library()?.name}</h1>
      <Description value={library()?.description} variant="full" />
    </div>
  );
};

export default LibraryPage;
