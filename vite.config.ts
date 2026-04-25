import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import { defineConfig } from "vite";
import viteSolid from "vite-plugin-solid";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    // {
    //   ...mdx({
    //     jsx: true,
    //     jsxImportSource: "solid-js",
    //     providerImportSource: "solid-mdx",
    //     remarkPlugins: [remarkGfm, remarkFrontmatter],
    //     rehypePlugins: [mdxPrism],
    //   }),
    //   enforce: "pre",
    // },
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteSolid({ ssr: true }),
    // blogPostsGenerator(),
    // blogPostsStaticAssetCopy(),
  ],
});
