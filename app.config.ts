import { defineConfig } from "@solidjs/start/config";
import type { PluginOption } from "vite";
import solidStyled from "unplugin-solid-styled";
import { blogPostsGenerator, blogPostsStaticAssetCopy } from "./config/blog-posts-plugin";
import remarkFrontmatter from "remark-frontmatter";
import { mdxPrism } from "./config/mdx-prism";
import remarkGfm from "remark-gfm";
import path from "node:path";

/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
import { viteStaticCopy } from "vite-plugin-static-copy";
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
  },
});
