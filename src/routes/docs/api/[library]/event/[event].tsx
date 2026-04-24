import { useParams } from "@solidjs/router";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const EventPage = () => {
  const params = useParams<PathParams["/api/[library]/event/[event]"]>();
  const event = useDocEntry(params.library, "events", params.event);

  return <div>Class: {JSON.stringify(event(), null, 2)}</div>;
};

export default EventPage;
