import { Match, Switch } from "solid-js";
import classIcon from "./class/class.svg";
import classIconDark from "./class/class_dark.svg";
import constantIcon from "./constant/constant.svg";
import constantIconDark from "./constant/constant_dark.svg";
import documentationIcon from "./documentation/documentation.svg";
import documentationIconDark from "./documentation/documentation_dark.svg";
import enumIcon from "./enum/enum.svg";
import enumIconDark from "./enum/enum_dark.svg";
import eventIcon from "./event/event.svg";
import eventIconDark from "./event/event_dark.svg";
import functionIcon from "./function/function.svg";
import functionIconDark from "./function/function_dark.svg";
import styles from "./index.module.css";

export * from "./realm";

export type IconName = "class" | "constant" | "documentation" | "enum" | "event" | "function";

// TODO: Dark mode
const IconVariant = (props: { light: string; dark: string; alt: string }) => (
  <>
    <svg class={styles.icon} width={16} height={16} aria-label={props.alt}>
      <image href={props.light} width={16} height={16} />
    </svg>
  </>
);

export const Icon = (props: { name: IconName }) => (
  <Switch>
    <Match when={props.name === "class"}>
      <IconVariant light={classIcon} dark={classIconDark} alt="class" />
    </Match>
    <Match when={props.name === "constant"}>
      <IconVariant light={constantIcon} dark={constantIconDark} alt="constant" />
    </Match>
    <Match when={props.name === "documentation"}>
      <IconVariant light={documentationIcon} dark={documentationIconDark} alt="documentation" />
    </Match>
    <Match when={props.name === "enum"}>
      <IconVariant light={enumIcon} dark={enumIconDark} alt="enum" />
    </Match>
    <Match when={props.name === "event"}>
      <IconVariant light={eventIcon} dark={eventIconDark} alt="event" />
    </Match>
    <Match when={props.name === "function"}>
      <IconVariant light={functionIcon} dark={functionIconDark} alt="function" />
    </Match>
  </Switch>
);
