import { createAsync, query, redirect } from "@solidjs/router";
import { allLibraries, type Library } from "@tasbox-org/docs";
import type { ElementOf } from "#types/utils";

type EntryKey = "constants" | "functions" | "enums" | "classes" | "events";

const getDocEntry = query(
  async <Key extends EntryKey>(
    libraryName: string,
    entryKey: EntryKey,
    entryName: string,
  ): Promise<ElementOf<Library[Key]>> => {
    const library = allLibraries.find((library) => library.name === libraryName);
    if (library === undefined) {
      throw redirect("/404", { status: 404 });
    }

    const entries = library[entryKey];
    const entry = entries?.find((event) => event.name === entryName) as ElementOf<Library[Key]> | undefined;

    if (entry === undefined) {
      throw redirect("/404", { status: 404 });
    }

    return entry;
  },
  "docEntry",
);

export const useDocEntry = <Key extends EntryKey>(libraryName: string, entryKey: Key, entryName: string) =>
  createAsync<ElementOf<Library[Key]>>(
    () => getDocEntry(libraryName, entryKey, entryName) as Promise<ElementOf<Library[Key]>>,
  );
