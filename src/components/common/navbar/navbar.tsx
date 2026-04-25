import type { Component } from "solid-js";
import styles from "./navbar.module.css";

// TODO: Add skip link to main content
export const Navbar: Component = () => {
  return (
    <div class={styles.navbar}>
      <a href="/">TASBox</a>
      <nav>
        <ul>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/docs">Docs</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>
      </nav>
      <div>
        <button type="button">Light/Dark</button>
      </div>
    </div>
  );
};
