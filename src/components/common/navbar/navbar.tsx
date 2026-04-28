import type { Component } from "solid-js";
import { Button, ButtonNavLink } from "#components/common/button";
import styles from "./navbar.module.css";

// TODO: Add skip link to main content
export const Navbar: Component = () => {
  return (
    <div class={styles.navbar}>
      <a href="/">TASBox</a>
      <nav>
        <ul class={styles.list}>
          <li class={styles.listItem}>
            <ButtonNavLink href="/">About</ButtonNavLink>
          </li>
          <li class={styles.listItem}>
            <ButtonNavLink href="/docs/guides/introduction" match="/docs/*">
              Docs
            </ButtonNavLink>
          </li>
          <li class={styles.listItem}>
            <ButtonNavLink href="/blog" match="/blog/*">
              Blog
            </ButtonNavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Button>Light/Dark</Button>
      </div>
    </div>
  );
};
