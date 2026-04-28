import fs from "node:fs";
import path from "node:path";
import { readSync } from "to-vfile";
import { matter as parseMatter } from "vfile-matter";
import type { Plugin } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

interface BlogPost {
  authors: string[];
  tags: string[];
  filesystemPath: string;
  date: Date;
  [key: string]: any;
}

const BLOG_DIRECTORY = "src/routes/blog";
const DATA_DIRECTORY = "src/data";

const OUTPUT_FILE = path.join(DATA_DIRECTORY, "blog-posts.json");

const BLOG_POST_FOLDER_REGEX = /^\/?(?<blogPost>(?<date>\d{4}-\d{2}-\d{2})-(\w+-)*\w+)/;

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

const toBlogPost = (directory: string): BlogPost => {
  const file = readSync(path.join(directory, "index.mdx"));
  parseMatter(file);

  const directoryName = path.basename(directory);

  const matter = file.data.matter as any;
  const date = BLOG_POST_FOLDER_REGEX.exec(directoryName)?.groups?.date ?? "";

  return {
    ...matter,
    filesystemPath: directoryName,
    authors: normaliseStringArray(matter.authors),
    tags: normaliseStringArray(matter.tags),
    date,
  };
};

const readBlogPosts = () => {
  const blogDirectory = path.resolve(BLOG_DIRECTORY);
  const contents = fs.readdirSync(blogDirectory);

  return contents
    .map((subpath) => path.join(blogDirectory, subpath))
    .filter(isBlogPost)
    .map(toBlogPost);
};

const processFiles = () => {
  const outputFile = path.resolve(OUTPUT_FILE);
  const blogPosts = readBlogPosts();

  fs.writeFileSync(outputFile, JSON.stringify(blogPosts, null, 2), "utf-8");
};

// https://andi.dev/blog/how-solid-start-blog/
export const blogPostsGenerator = (): Plugin => ({
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

const renameStaticAsset = (fileName: string, fileExtension: string, fullPath: string): string => {
  const absoluteBlogDirectory = path.resolve(BLOG_DIRECTORY);
  const { dir: absoluteFileDirectory } = path.parse(fullPath);

  const relativeFileDirectory = absoluteFileDirectory.replace(absoluteBlogDirectory, "");
  const blogPostDirectory = BLOG_POST_FOLDER_REGEX.exec(relativeFileDirectory)?.groups?.blogPost;

  if (blogPostDirectory === undefined) {
    throw new Error(`Failed to transform blog post static asset: ${fullPath}`);
  }

  const blogPosts = readBlogPosts();
  const blogPost = blogPosts.find((post) => post.filesystemPath === blogPostDirectory);

  if (blogPost === undefined) {
    throw new Error(`Unable to find blog post for folder: ${blogPostDirectory} (full asset path: ${fullPath})`);
  }

  if (!("slug" in blogPost)) {
    throw new Error(`Blog post does not have slug: ${blogPostDirectory}`);
  }

  const newRelativeFileDirectory = relativeFileDirectory.replace(BLOG_POST_FOLDER_REGEX, blogPost.slug);

  return path.join(newRelativeFileDirectory, `${fileName}.${fileExtension}`);
};

export const blogPostsStaticAssetCopy = () =>
  viteStaticCopy({
    structured: false,
    targets: [
      {
        src: path.join(BLOG_DIRECTORY, "**", "*.{png,mp4}"),
        dest: "blog",
        overwrite: true,
        rename: renameStaticAsset,
      },
    ],
  });
