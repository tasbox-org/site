import { createAsync, query, redirect, useParams } from "@solidjs/router";
import { allLibraries } from "@tasbox-org/docs";
import type { PathParams } from "#types/path-params";

const getEvent = query(async (libraryName: string, eventName: string) => {
  const library = allLibraries.find((library) => library.name === libraryName);
  if (library === undefined) {
    return redirect("/404", { status: 404 });
  }

  return library.events?.find((event) => event.name === eventName) ?? redirect("/404", { status: 404 });
}, "library.event");

const EventPage = () => {
  const params = useParams<PathParams["/api/[library]/event/[event]"]>();
  const event = createAsync(() => getEvent(params.library, params.event));

  return <div>Class: {JSON.stringify(event(), null, 2)}</div>;
};

export default EventPage;
