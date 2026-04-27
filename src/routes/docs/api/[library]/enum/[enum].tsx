import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import { useDocEntry } from "#hooks/use-doc-entry";
import type { PathParams } from "#types/path-params";

const EnumPage = () => {
  const params = useParams<PathParams["/api/[library]/enum/[enum]"]>();
  const enm = useDocEntry(
    () => params.library,
    "enums",
    () => params.enum,
  );

  return (
    <div>
      <RealmHeading realms={enm()?.realms} name={enm()?.name} />
      <Description value={enm()?.description} />

      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <For each={enm()?.values}>
            {(value) => (
              <tr>
                <td>{value}</td>
                <td>
                  <em>No description</em>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default EnumPage;
