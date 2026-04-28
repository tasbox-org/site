import { useParams } from "@solidjs/router";
import type { Property } from "@tasbox-org/docs";
import { For, Show } from "solid-js";
import { CodeBlock } from "#components/common/code-block/code-block";
import { Description } from "#components/docs/description";
import { PropertyList } from "#components/docs/property-list";
import { RealmHeading } from "#components/docs/realm-heading";
import { SecondaryHeading } from "#components/docs/secondary-heading";
import { renderType } from "#helpers/render-type";
import { useDocEntries } from "#hooks/use-doc-entries";
import type { PathParams } from "#types/path-params";

const renderParameterSignature = (parameters: Property[]) =>
  parameters
    .map((parameter) => `${parameter.name}${parameter.optional ? "?" : ""}: ${renderType(parameter.type)}`)
    .join(", ");

const renderReturnSignature = (returns: Property[]) =>
  returns.map((value) => `${renderType(value.type)}${value.optional ? "?" : ""}`).join(", ");

const renderFunctionSignature = (name: string, parameters: Property[], returns: Property[]) =>
  `${name}(${parameters.length > 0 ? renderParameterSignature(parameters) : ""})${returns.length > 0 ? `: ${renderReturnSignature(returns)}` : ""}`;

const FunctionPage = () => {
  const params = useParams<PathParams["/api/[library]/function/[function]"]>();
  const functions = useDocEntries(
    () => params.library,
    "functions",
    () => params.function,
  );

  return (
    <For each={functions() ?? []}>
      {(func) => (
        <div>
          <RealmHeading realms={func.realms} name={func.name} />
          <Description value={func.description} />
          <CodeBlock language="moonjuice">
            {renderFunctionSignature(func.name, func.parameters, func.returns)}
          </CodeBlock>
          <Show when={func.parameters.length > 0}>
            <SecondaryHeading>Parameters</SecondaryHeading>
            <PropertyList properties={func.parameters} />
          </Show>
          <Show when={func.returns.length > 0}>
            <SecondaryHeading>Returns</SecondaryHeading>
            <PropertyList properties={func.returns} />
          </Show>
        </div>
      )}
    </For>
  );
};

export default FunctionPage;
