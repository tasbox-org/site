import autoprefixer from "autoprefixer";
import postcssDarkThemeClass from "postcss-dark-theme-class";
import type { Config } from "postcss-load-config";
import postcssNested from "postcss-nested";

const config: Config = {
  // @ts-expect-error
  plugins: [autoprefixer, postcssNested, postcssDarkThemeClass],
};

// @ts-expect-error
module.exports = config;
