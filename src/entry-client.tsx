// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

// biome-ignore lint/style/noNonNullAssertion: Guaranteed to exist by SolidStart
mount(() => <StartClient />, document.getElementById("app")!);
