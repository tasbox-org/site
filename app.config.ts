import { defineConfig } from "@solidjs/start/config";
import type { PluginOption } from "vite";
import solidStyled from "unplugin-solid-styled";
import { blogPostsPlugin } from "./config/blog-posts-plugin";
import remarkFrontmatter from "remark-frontmatter";
import { mdxPrism } from "./config/mdx-prism";

/* @ts-ignore */
import mdx from "@vinxi/plugin-mdx";

export default defineConfig({
  extensions: ["mdx", "md"],
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
        remarkPlugins: [remarkFrontmatter],
        rehypePlugins: [mdxPrism],
      }),
      blogPostsPlugin(),
    ],
  },
});
