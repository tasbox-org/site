import { Colours } from "#theme/colours";
import { CssReset } from "#theme/css-reset";
import { Fonts } from "#theme/fonts";
import { Spacing } from "#theme/spacing";

export const GlobalStyles = () => (
  <>
    <CssReset />
    <Colours />
    <Spacing />
    <Fonts />
  </>
);
