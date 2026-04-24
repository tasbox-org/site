import { useParams } from "@solidjs/router";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const ClassPage = () => {
  const params = useParams<PathParams["/api/[library]/class/[class]"]>();
  const cls = useDocEntry(params.library, "classes", params.class);

  return <div>Class: {JSON.stringify(cls(), null, 2)}</div>;
};

export default ClassPage;
