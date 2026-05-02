import postcssGlobalData from "@csstools/postcss-global-data";
import postcssDarkThemeClass from "postcss-dark-theme-class";
import type { Config } from "postcss-load-config";
import postcssNested from "postcss-nested";
import postcssPresetEnv from "postcss-preset-env";

const config: Config = {
  // @ts-expect-error
  plugins: [
    postcssGlobalData({ files: ["./src/theme/breakpoints.css"] }),
    postcssNested,
    postcssDarkThemeClass,
    postcssPresetEnv(),
  ],
};

// @ts-expect-error
module.exports = config;
