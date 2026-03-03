import type { Plugin } from "vite";
import path from "node:path";
import fs from "node:fs";
import { readSync } from "to-vfile";
import { matter as parseMatter } from "vfile-matter";
import { viteStaticCopy } from "vite-plugin-static-copy";

interface BlogPost {
  authors: string[];
  tags: string[];
  filesystemPath: string;
  [key: string]: any;
}

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

const toBlogPost = (directory: string): BlogPost => {
  const file = readSync(path.join(directory, "index.mdx"));
  parseMatter(file);

  const matter = file.data.matter as any;

  return {
    ...matter,
    filesystemPath: path.basename(directory),
    authors: normaliseStringArray(matter.authors),
    tags: normaliseStringArray(matter.tags),
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

const blogPostDirectoryRegex = /^\/?(?<blogPost>\d{4}-\d{2}-\d{2}-(\w+-)*\w+)/;

export const blogPostsStaticAssetCopy = () =>
  viteStaticCopy({
    targets: [
      {
        src: path.join(BLOG_DIRECTORY, "**", "*.png"),
        dest: "blog",
        overwrite: true,
        rename: (fileName, fileExtension, fullPath) => {
          const absoluteBlogDirectory = path.resolve(BLOG_DIRECTORY);
          const { dir: absoluteFileDirectory } = path.parse(fullPath);

          const relativeFileDirectory = absoluteFileDirectory.replace(absoluteBlogDirectory, "");
          const blogPostDirectory = blogPostDirectoryRegex.exec(relativeFileDirectory)?.groups?.blogPost;

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

          const newRelativeFileDirectory = path.join(
            "/",
            relativeFileDirectory.replace(blogPostDirectoryRegex, blogPost.slug)
          );

          return path.join(
            path.relative(relativeFileDirectory, newRelativeFileDirectory),
            `${fileName}.${fileExtension}`
          );
        },
      },
    ],
  });
