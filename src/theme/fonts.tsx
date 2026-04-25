import { css } from "solid-styled";

export const ROOT_FONT_SIZE_PIXELS = 16;

export const Fonts = () => {
  css`
    @global {
      @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Rubik+Mono+One&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

      :root {
        --body-font: Rubik;
        --impact-font: "Rubik Mono One";
        --monospace-font: "JetBrains Mono";

        font-family: var(--body-font), sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        font-size: ${`${ROOT_FONT_SIZE_PIXELS}px`};
      }
    }
  `;

  return null;
};
