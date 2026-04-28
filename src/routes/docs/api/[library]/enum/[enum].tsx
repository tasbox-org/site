import { useParams } from "@solidjs/router";
import { For } from "solid-js";
import { Description } from "#components/docs/description";
import { RealmHeading } from "#components/docs/realm-heading";
import type { PathParams } from "#types/path-params";
import { useDocEntries } from "../../../../../hooks/use-doc-entries";

const EnumPage = () => {
  const params = useParams<PathParams["/api/[library]/enum/[enum]"]>();
  const enums = useDocEntries(
    () => params.library,
    "enums",
    () => params.enum,
  );

  return (
    <For each={enums() ?? []}>
      {(enm) => (
        <div>
          <RealmHeading realms={enm.realms} name={enm.name} />
          <Description value={enm.description} />

          <table>
            <thead>
              <tr>
                <th>Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <For each={enm.values}>
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
      )}
    </For>
  );
};

export default EnumPage;
