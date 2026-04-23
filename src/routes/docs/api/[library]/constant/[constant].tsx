import { createAsync, query, redirect, useParams } from "@solidjs/router";
import { allLibraries } from "@tasbox-org/docs";
import type { PathParams } from "#types/path-params";

const getConstant = query(async (libraryName: string, constantName: string) => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    return redirect("/404", { status: 404 });
  }

  return library.constants?.find((constant) => constant.name === constantName) ?? redirect("/404", { status: 404 });
}, "library.constant");

const ConstantPage = () => {
  const params = useParams<PathParams["/api/[library]/constant/[constant]"]>();
  const constant = createAsync(() => getConstant(params.library, params.constant));

  return <div>Class: {JSON.stringify(constant(), null, 2)}</div>;
};

export default ConstantPage;
