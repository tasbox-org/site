import { For, Show } from "solid-js";
import { Icon, type IconName } from "#components/icons";
import styles from "./breadcrumbs.module.css";

const BreadcrumbsSeparator = () => (
  <span aria-hidden class={styles.breadcrumbsSeparator}>
    {">"}
  </span>
);

export interface BreadcrumbsProps {
  icon?: IconName;
  segments: readonly string[];
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const prefix = () => props.segments.slice(0, props.segments.length - 1);
  const hasPrefix = () => prefix().length > 0;

  const name = () => props.segments.at(-1);

  return (
    <div class={styles.breadcrumbs}>
      <Show when={() => props.icon !== undefined}>
        <Icon name={props.icon as IconName} />
      </Show>
      <Show when={hasPrefix()}>
        <For each={prefix()}>
          {(breadcrumb) => (
            <>
              {breadcrumb}
              <BreadcrumbsSeparator />
            </>
          )}
        </For>
      </Show>{" "}
      {name()}
    </div>
  );
};
