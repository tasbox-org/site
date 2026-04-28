import type { ClassProperty, FunctionParameter, Property } from "@tasbox-org/docs";
import { For, Show } from "solid-js";
import { Description } from "#components/docs/description";
import { renderType } from "#helpers/render-type";
import styles from "./property-list.module.css";

const renderDefaultValue = ({ type, defaultValue }: FunctionParameter | ClassProperty) => {
  if (type === "string") {
    return `"${defaultValue}"`;
  }

  if (defaultValue === undefined) {
    return "nil";
  }

  return defaultValue.toString();
};

export const PropertyList = (props: { properties: (Property | FunctionParameter | ClassProperty)[] }) => (
  <dl class={styles.properties}>
    <For each={props.properties}>
      {(property) => (
        <div class={styles.property}>
          <dt class={styles.name}>{property.name}</dt>
          <dd class={styles.type}>
            Type:{" "}
            <code>
              {renderType(property.type)}
              {property.optional ? "?" : ""}
            </code>
          </dd>
          <Show when={"defaultValue" in property && property.defaultValue !== undefined}>
            <dd class={styles.default}>
              Default: <code>{renderDefaultValue(property)}</code>
            </dd>
          </Show>
          <dd class={styles.description}>
            <Description value={property.description} />
          </dd>
        </div>
      )}
    </For>
  </dl>
);
