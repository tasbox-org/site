import type { Component } from "solid-js";
import { ButtonNavLink } from "#components/common/button";
import styles from "./navbar.module.css";

// TODO: Add skip link to main content
export const Navbar: Component = () => {
  return (
    <div class={styles.navbar}>
      <a href="/">TASBox</a>
      <nav>
        <ul>
          <li>
            <ButtonNavLink href="/" isActive>
              About
            </ButtonNavLink>
          </li>
          <li>
            <ButtonNavLink href="/docs">Docs</ButtonNavLink>
          </li>
          <li>
            <ButtonNavLink href="/blog">Blog</ButtonNavLink>
          </li>
        </ul>
      </nav>
      <div>
        <button type="button">Light/Dark</button>
      </div>
    </div>
  );
};
