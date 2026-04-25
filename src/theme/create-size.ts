import { ROOT_FONT_SIZE_PIXELS } from "#theme/fonts";

export const createSize = (sizePixels: number) => `${sizePixels / ROOT_FONT_SIZE_PIXELS}rem`;
