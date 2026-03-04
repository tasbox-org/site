import { solidStart } from "@solidjs/start/config";
import { defineConfig } from "vite";
import solidStyled from "unplugin-solid-styled";
import { blogPostsGenerator, blogPostsStaticAssetCopy } from "./config/blog-posts-plugin";
import remarkFrontmatter from "remark-frontmatter";
import { mdxPrism } from "./config/mdx-prism";
import remarkGfm from "remark-gfm";
import path from "node:path";
import { nitroV2Plugin } from "@solidjs/vite-plugin-nitro-2";
import mdx from "@mdx-js/rollup";

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
    solidStyled.vite({
      filter: {
        include: "src/**/*.tsx",
        exclude: "node_modules/**/*.{ts,js}",
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
    },
  },
});
