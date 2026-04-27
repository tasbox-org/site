import { useParams } from "@solidjs/router";
import type { Property } from "@tasbox-org/docs";
import { CodeBlock } from "#components/common/code-block/code-block";
import { Description } from "#components/docs/description";
import { PropertyTable } from "#components/docs/property-table";
import { RealmHeading } from "#components/docs/realm-heading";
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
      <h2>Properties</h2>
      <PropertyTable properties={cls()?.properties ?? []} nameColumnHeader="Field" />
    </div>
  );
};

export default ClassPage;
