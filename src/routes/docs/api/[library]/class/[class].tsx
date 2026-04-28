import { useParams } from "@solidjs/router";
import type { Property } from "@tasbox-org/docs";
import { For } from "solid-js";
import { CodeBlock } from "#components/common/code-block/code-block";
import { Description } from "#components/docs/description";
import { PropertyList } from "#components/docs/property-list";
import { RealmHeading } from "#components/docs/realm-heading";
import { SecondaryHeading } from "#components/docs/secondary-heading";
import { renderType } from "#helpers/render-type";
import { useDocEntries } from "#hooks/use-doc-entries";
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

const ClassPage = () => {
  const params = useParams<PathParams["/api/[library]/class/[class]"]>();
  const classes = useDocEntries(
    () => params.library,
    "classes",
    () => params.class,
  );

  return (
    <For each={classes() ?? []}>
      {(cls) => (
        <div>
          <RealmHeading realms={cls.realms} name={cls.name} />
          <Description value={cls.description} />
          <CodeBlock language="moonjuice">{`type ${cls.name} = ${renderClassMoonJuice(cls.properties)}`}</CodeBlock>
          <SecondaryHeading>Properties</SecondaryHeading>
          <PropertyList properties={cls.properties ?? []} />
        </div>
      )}
    </For>
  );
};

export default ClassPage;
