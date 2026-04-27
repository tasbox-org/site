import type { ParentProps } from "solid-js";
import styles from "./secondary-heading.module.css";

export const SecondaryHeading = (props: ParentProps) => <h2 class={styles.heading}>{props.children}</h2>;
