import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import type { PathParams } from "#types/path-params";
import { useDocEntries } from "../../../../../hooks/use-doc-entries";

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
        </div>
      )}
    </For>
  );
};

export default EventPage;
