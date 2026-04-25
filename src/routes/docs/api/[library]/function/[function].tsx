import { useParams } from "@solidjs/router";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const FunctionPage = () => {
  const params = useParams<PathParams["/api/[library]/function/[function]"]>();
  const func = useDocEntry(() => params.library, "functions", () => params.function);

  return <div>Class: {JSON.stringify(func(), null, 2)}</div>;
};

export default FunctionPage;
