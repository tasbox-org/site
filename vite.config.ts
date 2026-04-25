import path from "node:path";
import mdx from "@mdx-js/rollup";
import { solidStart } from "@solidjs/start/config";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";
import { blogPostsGenerator, blogPostsStaticAssetCopy } from "./config/blog-posts-plugin";
import { mdxPrism } from "./config/mdx-prism";

export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        rehypePlugins: [mdxPrism],
      }),
      enforce: "pre",
    },
    solidStart({
      extensions: ["mdx", "md"],
    }),
    nitroV2Plugin({
      preset: "cloudflare-pages",
      rollupConfig: {
        external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
      },
    }),
    blogPostsGenerator(),
    blogPostsStaticAssetCopy(),
  ],
  resolve: {
    alias: {
      "#components": path.resolve(import.meta.dirname, "./src/components"),
      "#theme": path.resolve(import.meta.dirname, "./src/theme"),
      "#data": path.resolve(import.meta.dirname, "./src/data"),
      "#hooks": path.resolve(import.meta.dirname, "./src/hooks"),
      "#types": path.resolve(import.meta.dirname, "./src/types"),
    },
  },
});
