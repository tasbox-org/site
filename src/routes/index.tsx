import { A } from "@solidjs/router";
import { ButtonLink } from "#components/common/button";
import { Metadata } from "#components/common/metadata";
import styles from "./index.module.css";

export default function Home() {
  return (
    <>
      <Metadata
        type="website"
        description="Next-generation physics sandbox game built by veterans of the genre. Make games and addons using our extensive scripting API or just have some fun with friends. Forever FOSS."
        url="/"
      />
      <section class={styles.hero}>
        <div class={styles.overlay}>
          <h1 class={styles.heroImage}>
            <img src="/img/logo-dark.svg" alt="TASBox" class={styles.heroImage} />
          </h1>
          <div class={styles.heroText}>
            <p>Next-generation physics sandbox game built by veterans of the genre</p>
            <p>
              Make games and addons using <A href="/docs/guides/introduction">our extensive scripting API</A> or just
              have some fun with friends
            </p>
            <p>
              <em>
                Forever{" "}
                <A
                  href="https://en.wikipedia.org/wiki/Free_and_open-source_software"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FOSS.
                </A>
              </em>
            </p>
          </div>
          <div class={styles.socials}>
            <ButtonLink
              href="https://discord.gg/QKQuGUUF7c"
              target="_blank"
              rel="noopener noreferrer"
              class={styles.discordButton}
            >
              <img src="/img/thirdparty/discord-logo-white.svg" alt="Discord" class={styles.brandImage} />
            </ButtonLink>

            <ButtonLink
              href="https://github.com/tasbox-org"
              target="_blank"
              rel="noopener noreferrer"
              class={styles.githubButton}
            >
              <img src="/img/thirdparty/github-lockup-black.svg" alt="GitHub" class={styles.brandImage} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
