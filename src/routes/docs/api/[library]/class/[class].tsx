import { useParams } from "@solidjs/router";
import type { ClassProperty, FunctionParameter, Property } from "@tasbox-org/docs";
import { For, Show } from "solid-js";
import { CodeBlock } from "#components/common/code-block/code-block";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { SecondaryHeading } from "#components/docs/secondary-heading";
import { renderType } from "#helpers/render-type";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const renderClassMoonJuice = (properties: Property[]) => {
  if (properties.length < 1) {
    return "{}";
  }

  const stringifiedProperties = properties.map((property) => {
    const key = typeof property.name === "string" ? `.${property.name}` : `[${property.name}]`;
    const type = `${renderType(property.type)}${property.optional ? "?" : ""}`;

    return `${key}: ${type}`;
  });

  return `{\n  ${stringifiedProperties.join(",\n  ")},\n}`;
};

const renderDefaultValue = ({ type, defaultValue }: FunctionParameter | ClassProperty) => {
  if (type === "string") {
    return `"${defaultValue}"`;
  }

  if (defaultValue === undefined) {
    return "nil";
  }

  return defaultValue.toString();
};

const ClassPage = () => {
  const params = useParams<PathParams["/api/[library]/class/[class]"]>();
  const cls = useDocEntry(
    () => params.library,
    "classes",
    () => params.class,
  );

  return (
    <div>
      <RealmHeading realms={cls()?.realms} name={cls()?.name} />
      <Description value={cls()?.description} />
      <CodeBlock language="moonjuice">{`type ${cls()?.name} = ${renderClassMoonJuice(cls()?.properties ?? [])}`}</CodeBlock>
      <SecondaryHeading>Properties</SecondaryHeading>

      <dl>
        <For each={cls()?.properties}>
          {(property) => (
            <>
              <dt>{property.name}</dt>
              <dd>
                Type: <code>{renderType(property.type)}</code>
              </dd>
              <Show when={property.defaultValue !== undefined}>
                <dd>
                  Default: <code>{renderDefaultValue(property)}</code>
                </dd>
              </Show>
              <dd>
                <Description value={property.description} />
              </dd>
            </>
          )}
        </For>
      </dl>
    </div>
  );
};

export default ClassPage;
