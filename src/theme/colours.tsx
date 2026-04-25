import { css } from "solid-styled";

export const Colours = () => {
  css`
    @global {
      :root {
        color-scheme: light dark;
      }
    }
  `;

  return null;
};
