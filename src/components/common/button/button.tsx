import { A, type AnchorProps, useMatch } from "@solidjs/router";
import type { JSX, ParentProps } from "solid-js";
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

export const ButtonLink = (props: AnchorProps) => {
  return (
    <A {...props} class={`${props.class ?? ""} ${styles.button} ${styles.enabled}`}>
      {props.children}
    </A>
  );
};

export interface ButtonNavLinkProps extends ParentProps {
  href: string;
  match?: string;
  class?: string;
}

export const ButtonNavLink = (props: ButtonNavLinkProps) => {
  const match = useMatch(() => props.match ?? props.href);

  return (
    <A {...props} class={`${props.class ?? ""} ${styles.navButton} ${match() ? styles.enabled : ""}`}>
      {props.children}
    </A>
  );
};
