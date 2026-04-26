import { useParams } from "@solidjs/router";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const EventPage = () => {
  const params = useParams<PathParams["/api/[library]/event/[event]"]>();
  const event = useDocEntry(
    () => params.library,
    "events",
    () => params.event,
  );

  return (
    <div>
      <RealmHeading realms={event()?.realms} name={event()?.name} />
      <Description value={event()?.description} />
    </div>
  );
};

export default EventPage;
