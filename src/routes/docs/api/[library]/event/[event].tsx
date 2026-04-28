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

const renderParameterList = (parameters: Property[]) => parameters.map((param) => param.name).join(", ");

const renderReturnList = (returns: Property[]) =>
  returns.length > 0 ? `: ${returns.map((ret) => renderType(ret.type)).join(", ")}` : "";

const renderEventListenerSignature = (libraryName: string, name: string, parameters: Property[], returns: Property[]) =>
  `${libraryName}.addEventListener("${name}", fn(${renderParameterList(parameters)}) end)${renderReturnList(returns)}`;

const EventPage = () => {
  const params = useParams<PathParams["/api/[library]/event/[event]"]>();
  const events = useDocEntries(
    () => params.library,
    "events",
    () => params.event,
  );

  return (
    <For each={events() ?? []}>
      {(event) => (
        <div>
          <RealmHeading realms={event.realms} name={event.name} />
          <Description value={event.description} />
          <CodeBlock language="moonjuice">
            {renderEventListenerSignature(params.library, event.name, event.parameters, event.returns)}
          </CodeBlock>
          <Show when={event.parameters.length > 0}>
            <SecondaryHeading>Parameters</SecondaryHeading>
            <PropertyList properties={event.parameters} />
          </Show>
          <Show when={event.returns.length > 0}>
            <SecondaryHeading>Returns</SecondaryHeading>
            <PropertyList properties={event.returns} />
          </Show>
        </div>
      )}
    </For>
  );
};

export default EventPage;
