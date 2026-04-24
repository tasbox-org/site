import { useParams } from "@solidjs/router";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const ConstantPage = () => {
  const params = useParams<PathParams["/api/[library]/constant/[constant]"]>();
  const constant = useDocEntry(params.library, "constants", params.constant);

  return <div>Class: {JSON.stringify(constant(), null, 2)}</div>;
};

export default ConstantPage;
