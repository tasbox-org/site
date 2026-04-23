import { createAsync, query, redirect, useParams } from "@solidjs/router";
import { allLibraries } from "@tasbox-org/docs";
import type { PathParams } from "#types/path-params";

const getFunction = query(async (libraryName: string, functionName: string) => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    return redirect("/404", { status: 404 });
  }

  return library.functions?.find((func) => func.name === functionName) ?? redirect("/404", { status: 404 });
}, "library.function");

const FunctionPage = () => {
  const params = useParams<PathParams["/api/[library]/function/[function]"]>();
  const func = createAsync(() => getFunction(params.library, params.function));

  return <div>Class: {JSON.stringify(func(), null, 2)}</div>;
};

export default FunctionPage;
