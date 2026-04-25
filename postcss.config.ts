import autoprefixer from "autoprefixer";
import type { Config } from "postcss-load-config";
import postcssNested from "postcss-nested";

const config: Config = {
  // @ts-expect-error
  plugins: [autoprefixer, postcssNested],
};

// @ts-expect-error
module.exports = config;
