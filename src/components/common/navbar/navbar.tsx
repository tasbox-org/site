import type { Component } from "solid-js";

export const Navbar: Component = () => {
  return (
    <header>
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
      <button type="button">Light/Dark</button>
    </header>
  );
};
