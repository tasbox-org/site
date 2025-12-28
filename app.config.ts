import { defineConfig } from "@solidjs/start/config";
import type { PluginOption } from "vite";
import solidStyled from "unplugin-solid-styled";

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
      }),
    ],
  },
});
