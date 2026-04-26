import { createAsync, query, redirect } from "@solidjs/router";
import { allLibraries, type Library } from "@tasbox-org/docs";

const getDocLibrary = query(async (libraryName: string): Promise<Library> => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    throw redirect("/404", { status: 404 });
  }

  return library;
}, "docLibrary");

export const useDocLibrary = (libraryName: () => string) => createAsync<Library>(() => getDocLibrary(libraryName()));
