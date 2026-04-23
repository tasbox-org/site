import { createAsync, query, redirect, useParams } from "@solidjs/router";
import { allLibraries } from "@tasbox-org/docs";
import type { PathParams } from "#types/path-params";

const getEnum = query(async (libraryName: string, enumName: string) => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    return redirect("/404", { status: 404 });
  }

  return library.enums?.find((enm) => enm.name === enumName) ?? redirect("/404", { status: 404 });
}, "library.enum");

const EnumPage = () => {
  const params = useParams<PathParams["/api/[library]/enum/[enum]"]>();
  const enm = createAsync(() => getEnum(params.library, params.enum));

  return <div>Class: {JSON.stringify(enm(), null, 2)}</div>;
};

export default EnumPage;
