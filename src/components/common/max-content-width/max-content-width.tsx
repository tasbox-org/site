import type { ParentProps } from "solid-js";
import styles from "./max-content-width.module.css";

export const MaxContentWidth = (props: ParentProps) => <div class={styles.maxContentWidth}>{props.children}</div>;
