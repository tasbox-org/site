import fs from "node:fs";
import path from "node:path";
import { readSync } from "to-vfile";
import { matter as parseMatter } from "vfile-matter";
import type { Plugin } from "vite";

interface Guide {
  breadcrumbs: readonly string[];
  path: string;
}

const GUIDES_DIRECTORY = "src/routes/docs/guides";
const DATA_DIRECTORY = "src/data";

const OUTPUT_FILE = path.join(DATA_DIRECTORY, "guides.json");

const toGuides = (path: string): Guide[] => {
  try {
    if (fs.statSync(path).isDirectory()) {
      return readGuides(path);
    }

    if (!path.endsWith(".mdx") && !path.endsWith(".md")) {
      return [];
    }

    const file = readSync(path);
    parseMatter(file);

    return [file.data.matter as Guide];
  } catch {
    return [];
  }
};

const readGuides = (directory: string) => {
  const contents = fs.readdirSync(directory);

  return contents
    .filter((subpath) => subpath !== "~" && subpath !== "." && subpath !== "..")
    .map((subpath) => path.join(directory, subpath))
    .flatMap(toGuides);
};

const processFiles = () => {
  const outputFile = path.resolve(OUTPUT_FILE);
  const guides = readGuides(path.resolve(GUIDES_DIRECTORY));

  fs.writeFileSync(outputFile, JSON.stringify(guides, null, 2), "utf-8");
};

export const guidesGenerator = (): Plugin => ({
  name: "guides-generator",
  buildStart: processFiles,
  configureServer: (server) => {
    server.watcher.on("change", async (filePath) => {
      if (filePath.includes(`/${GUIDES_DIRECTORY}`)) {
        processFiles();
      }
    });
  },
});
