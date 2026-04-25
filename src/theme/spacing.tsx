import { css } from "solid-styled";
import { createSize } from "#theme/create-size";

export const Spacing = () => {
  css`
    @global {
      :root {
        --spacing-1: 1px;
        --spacing-2: 2px;
        --spacing-3: ${createSize(3)};
        --spacing-5: ${createSize(5)};
        --spacing-8: ${createSize(8)};
        --spacing-13: ${createSize(13)};
        --spacing-21: ${createSize(21)};
      }
    }
  `;

  return null;
};
