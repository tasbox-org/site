import { createAsync, query, redirect, useParams } from "@solidjs/router";
import { allLibraries } from "@tasbox-org/docs";
import type { PathParams } from "#types/path-params";

const getClass = query(async (libraryName: string, className: string) => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    return redirect("/404", { status: 404 });
  }

  return library.classes?.find((cls) => cls.name === className) ?? redirect("/404", { status: 404 });
}, "library.class");

const ClassPage = () => {
  const params = useParams<PathParams["/api/[library]/class/[class]"]>();
  const cls = createAsync(() => getClass(params.library, params.class));

  return <div>Class: {JSON.stringify(cls(), null, 2)}</div>;
};

export default ClassPage;
