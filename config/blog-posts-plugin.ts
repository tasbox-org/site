import type { Plugin } from "vite";
import path from "node:path";
import fs from "node:fs";
import { readSync } from "to-vfile";
import { matter as parseMatter } from "vfile-matter";

const BLOG_DIRECTORY = "src/routes/blog";
const DATA_DIRECTORY = "src/data";

const OUTPUT_FILE = path.join(DATA_DIRECTORY, "blog-posts.json");

const normaliseStringArray = (value: unknown): string[] => {
  if (!value) {
    return [];
  }

  if (!Array.isArray(value)) {
    return [value.toString()];
  }

  return value.map((v) => v.toString());
};

const isBlogPost = (directory: string): boolean => {
  if (!fs.statSync(directory).isDirectory()) {
    return false;
  }

  const indexPath = path.join(directory, "index.mdx");
  return fs.statSync(indexPath).isFile();
};

const toBlogPost = (directory: string): object => {
  const file = readSync(path.join(directory, "index.mdx"));
  parseMatter(file);

  const matter = file.data.matter as any;

  return {
    ...matter,
    authors: normaliseStringArray(matter.authors),
    tags: normaliseStringArray(matter.tags),
  };
};

const processFiles = () => {
  const blogDirectory = path.resolve(BLOG_DIRECTORY);
  const outputFile = path.resolve(OUTPUT_FILE);

  const contents = fs.readdirSync(blogDirectory);

  const blogPosts = contents
    .map((subpath) => path.join(blogDirectory, subpath))
    .filter(isBlogPost)
    .map(toBlogPost);

  fs.writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2), "utf-8");
};

// https://andi.dev/blog/how-solid-start-blog/
export const blogPostsPlugin = (): Plugin => ({
  name: "blog-posts-generator",
  buildStart: processFiles,
  configureServer: (server) => {
    server.watcher.on("change", async (filePath) => {
      if (filePath.includes(`/${BLOG_DIRECTORY}`)) {
        processFiles();
      }
    });
  },
});
