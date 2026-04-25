import Fuse, { type FuseIndex, type FuseSearchOptions, type IFuseOptions } from "fuse.js";
import { createMemo } from "solid-js";

export interface UseSearchOptions<T> extends IFuseOptions<T> {
  search?: FuseSearchOptions;
  whenNoResults?: "show-none" | "show-all";
}

export const useSearch = <T>(
  docs: () => ReadonlyArray<T>,
  searchTerm: () => string,
  options?: UseSearchOptions<T>,
  index?: FuseIndex<T>,
) => {
  const fuse = createMemo(() => new Fuse(docs(), options, index));

  return createMemo(() => {
    const results = fuse()
      .search(searchTerm(), options?.search)
      .map((result) => result.item);

    if (results.length > 0) {
      return results;
    }

    switch (options?.whenNoResults) {
      case "show-all":
        return docs();
      default:
        return [];
    }
  });
};
