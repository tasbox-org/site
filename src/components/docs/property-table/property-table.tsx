import type { ClassProperty, FunctionParameter, Property } from "@tasbox-org/docs";
import { For, Show } from "solid-js";
import { Description } from "#components/docs/description";
import { renderType } from "#helpers/render-type";

const TableTypeCell = (props: { property: Property }) => (
  <td>
    <code>
      {renderType(props.property.type)}
      {props.property.optional ? "?" : ""}
    </code>
  </td>
);

const TableDescriptionCell = (props: { property: Property }) => (
  <td>{props.property.description ? <Description value={props.property.description} /> : <i>No description</i>}</td>
);

const renderDefaultValue = ({ type, defaultValue }: FunctionParameter | ClassProperty) => {
  if (type === "string") {
    return `"${defaultValue}"`;
  }

  if (defaultValue === undefined) {
    return "nil";
  }

  return defaultValue.toString();
};

export const PropertyTable = (props: {
  properties: (Property | FunctionParameter | ClassProperty)[];
  nameColumnHeader?: string;
}) => {
  const shouldRenderDefaultValues = () => props.properties.some((property) => "defaultValue" in property);
  const nameColumnHeader = () => props.nameColumnHeader ?? "Name";

  return (
    <table>
      <thead>
        <tr>
          <th>{nameColumnHeader()}</th>
          <th>Type</th>
          <Show when={shouldRenderDefaultValues}>
            <th>Default Value</th>
          </Show>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <For each={props.properties}>
          {(property) => (
            <tr>
              <td>{property.name}</td>
              <TableTypeCell property={property} />
              <Show when={shouldRenderDefaultValues}>
                <td>{property.optional ? <code>{renderDefaultValue(property)}</code> : <i>Required</i>}</td>
              </Show>
              <TableDescriptionCell property={property} />
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};
