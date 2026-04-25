import type { JSX } from "solid-js";
import styles from "./button.module.css";

export const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      class={`${props.class} ${styles.button} ${props.disabled ? "" : styles.enabled}`}
    >
      {props.children}
    </button>
  );
};

export const ButtonLink = (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a {...props} class={`${props.class} ${styles.button} ${styles.enabled}`}>
      {props.children}
    </a>
  );
};

export const ButtonNavLink = (props: JSX.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }) => {
  return (
    <a {...props} class={`${props.class ?? ""} ${styles.navButton} ${props.isActive ? styles.enabled : ""}`}>
      {props.children}
    </a>
  );
};
