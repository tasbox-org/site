import { allLibraries, type Library } from "@tasbox-org/docs";
import type { Refractor } from "refractor/core";

const buildLibraryBuiltinsRegex = (library: Library) => {
  const functionNames = (library.functions ?? []).map((x) => x.name);
  const enumNames = (library.enums ?? []).map((x) => x.name);
  const constantNames = (library.constants ?? []).map((x) => x.name).filter((x) => typeof x === "string");

  if (library.events !== undefined && library.events.length > 0) {
    functionNames.push("addEventListener");
    functionNames.push("removeEventListener");
  }

  const keysRegex = functionNames.concat(enumNames, constantNames).join("|");
  if (keysRegex === "") {
    return null;
  }

  return `(?:${library.name}.(?:${keysRegex}))|(?:${library.name})`;
};

const buildBuiltinsRegex = () => {
  const librariesRegex = allLibraries
    .map(buildLibraryBuiltinsRegex)
    .filter((x) => x !== null)
    .join("|");

  return new RegExp(`\\b(?:${librariesRegex})\\b`);
};

// Modified from https://github.com/PrismJS/prism/blob/master/components/prism-lua.js
// Not necessarily 1:1 to real MoonJuice syntax, just good enough for highlighting in docs and blogs
const moonjuice = (Prism: Refractor) => {
  Prism.languages.moonjuice = {
    comment: /--(?:\[\[[\s\S]*?--]]|.*)/m,
    string: {
      pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
      greedy: true,
    },
    number:
      /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    builtin: buildBuiltinsRegex(),

    // https://github.com/FormidableLabs/prism-react-renderer/issues/255
    // Prism react themes are missing boolean support
    keyword:
      /\b(?:break|continue|return|do|end|fn|if|then|else|elseif|for|in|def|mut|export|not|and|or|nil|true|false|type)\b/,
    // boolean: /\b(?:true|false)\b/,

    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [
      /[+\-*/%&^]|[=~]=?|<[<=]?|>[>=]?|\|>?|/,
      {
        // Match ".." but don't break "..."
        pattern: /(^|[^.])\.\.(?!\.)/,
        lookbehind: true,
      },
    ],
    punctuation: /[[\](){},]|\.+/,
  };
};

moonjuice.displayName = "MoonJuice";

export { moonjuice };
