import { type Component, createEffect, createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { Button, ButtonNavLink } from "#components/common/button";
import styles from "./navbar.module.css";

// TODO: Add skip link to main content
export const Navbar: Component = () => {
  const [themeClass, setThemeClass] = createSignal<"is-light" | "is-dark" | undefined>(undefined);

  createEffect(() => {
    if (isServer) {
      return;
    }

    // biome-ignore lint/style/noNonNullAssertion: Page will always have root html
    document.getElementsByTagName("html")[0]!.classList = themeClass() ?? "";
  });

  return (
    <div class={styles.navbar}>
      <a href="/">
        <img src="/img/logo.svg" alt="TASBox" />
      </a>
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
        <Button class="light-mode-only" onClick={() => setThemeClass("is-dark")}>
          Dark
        </Button>
        <Button class="dark-mode-only" onClick={() => setThemeClass("is-light")}>
          Light
        </Button>
      </div>
    </div>
  );
};
