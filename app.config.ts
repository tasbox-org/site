import { defineConfig } from "@solidjs/start/config";
import type { PluginOption } from "vite";
import solidStyled from "unplugin-solid-styled";
import { blogPostsPlugin } from "./config/blog-posts-plugin";
import remarkFrontmatter from "remark-frontmatter";
import { mdxPrism } from "./config/mdx-prism";
import remarkGfm from "remark-gfm";
import path from "node:path";

/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
const { default: mdx } = pkg;

export default defineConfig({
  extensions: ["mdx", "md"],
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["__STATIC_CONTENT_MANIFEST", "node:async_hooks"],
    },
  },
  vite: {
    plugins: [
      solidStyled.vite({
        filter: {
          include: "src/**/*.tsx",
          exclude: "node_modules/**/*.{ts,js}",
        },
      }) as PluginOption,
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [mdxPrism],
      }),
      blogPostsPlugin(),
    ],
    resolve: {
      alias: {
        "#components": path.resolve(import.meta.dirname, "./src/components"),
      },
    },
  },
});
