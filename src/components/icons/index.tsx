import { Match, Switch } from "solid-js";
import classIcon from "./class/class.svg";
import classIconDark from "./class/class_dark.svg";
import constantIcon from "./constant/constant.svg";
import constantIconDark from "./constant/constant_dark.svg";
import darkThemeIcon from "./dark-theme/dark-theme.svg";
import darkThemeIconDark from "./dark-theme/dark-theme_dark.svg";
import documentationIcon from "./documentation/documentation.svg";
import documentationIconDark from "./documentation/documentation_dark.svg";
import enumIcon from "./enum/enum.svg";
import enumIconDark from "./enum/enum_dark.svg";
import eventIcon from "./event/event.svg";
import eventIconDark from "./event/event_dark.svg";
import functionIcon from "./function/function.svg";
import functionIconDark from "./function/function_dark.svg";
import githubIcon from "./github.svg";
import styles from "./index.module.css";
import lightThemeIcon from "./light-theme/light-theme.svg";
import lightThemeIconDark from "./light-theme/light-theme_dark.svg";

export * from "./realm";

export type IconName =
  | "class"
  | "constant"
  | "dark-theme"
  | "documentation"
  | "enum"
  | "event"
  | "function"
  | "light-theme"
  | "github";

export type IconSize = "16" | "fill";

// TODO: Dark mode
const IconVariant = (props: { light: string; dark: string; alt: string; size?: IconSize }) => {
  const size = () => {
    switch (props.size) {
      case "16":
        return 16;
      case "fill":
        return "100%";
      default:
        return 16;
    }
  };

  return (
    <svg class={styles.icon} width={size()} height={size()} aria-label={props.alt}>
      <image href={props.light} width={size()} height={size()} class="light-mode-only" />
      <image href={props.dark} width={size()} height={size()} class="dark-mode-only" />
    </svg>
  );
};

export const Icon = (props: { name: IconName; size?: IconSize }) => (
  <Switch>
    <Match when={props.name === "class"}>
      <IconVariant light={classIcon} dark={classIconDark} size={props.size} alt="class" />
    </Match>
    <Match when={props.name === "constant"}>
      <IconVariant light={constantIcon} dark={constantIconDark} size={props.size} alt="constant" />
    </Match>
    <Match when={props.name === "dark-theme"}>
      <IconVariant light={darkThemeIcon} dark={darkThemeIconDark} size={props.size} alt="dark theme" />
    </Match>
    <Match when={props.name === "documentation"}>
      <IconVariant light={documentationIcon} dark={documentationIconDark} size={props.size} alt="documentation" />
    </Match>
    <Match when={props.name === "enum"}>
      <IconVariant light={enumIcon} dark={enumIconDark} size={props.size} alt="enum" />
    </Match>
    <Match when={props.name === "event"}>
      <IconVariant light={eventIcon} dark={eventIconDark} size={props.size} alt="event" />
    </Match>
    <Match when={props.name === "function"}>
      <IconVariant light={functionIcon} dark={functionIconDark} size={props.size} alt="function" />
    </Match>
    <Match when={props.name === "light-theme"}>
      <IconVariant light={lightThemeIcon} dark={lightThemeIconDark} size={props.size} alt="light theme" />
    </Match>
    <Match when={props.name === "github"}>
      <IconVariant light={githubIcon} dark={githubIcon} size={props.size} alt="github" />
    </Match>
  </Switch>
);
