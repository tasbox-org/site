import { createAsync, query, redirect } from "@solidjs/router";
import { allLibraries, type Library } from "@tasbox-org/docs";
import type { DocsSidebarItem, DocsSidebarSection } from "#components/docs/sidebar";

const getDocLibrary = query(async (libraryName: string): Promise<Library> => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    throw redirect("/404", { status: 404 });
  }

  return library;
}, "docLibrary");

export const useDocLibrary = (libraryName: () => string) => createAsync<Library>(() => getDocLibrary(libraryName()));

export const useDocLibrarySidebarSections = (libraryName: () => string) =>
  createAsync<DocsSidebarSection[]>(async () => {
    const library = await getDocLibrary(libraryName());

    const constants: DocsSidebarSection[] =
      library.constants === undefined
        ? []
        : [
            {
              title: "Constants",
              items: library.constants.map(
                (constant): DocsSidebarItem => ({
                  title: constant.name.toString(),
                  href: `/docs/api/${library.name}/constant/${constant.name}`,
                }),
              ),
            },
          ];

    return [...constants];
  });
