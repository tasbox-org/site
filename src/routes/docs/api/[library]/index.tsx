import { createAsync, query, redirect, useParams } from "@solidjs/router";
import { allLibraries } from "@tasbox-org/docs";
import type { PathParams } from "#types/path-params";

const getLibrary = query(async (libraryName: string) => {
  return allLibraries.find((library) => library.name === libraryName) ?? redirect("/404", { status: 404 });
}, "library");

const LibraryPage = () => {
  const params = useParams<PathParams["/api/[library]"]>();
  const library = createAsync(() => getLibrary(params.library));

  return <div>Library: {JSON.stringify(library(), null, 2)}</div>;
};

export default LibraryPage;
