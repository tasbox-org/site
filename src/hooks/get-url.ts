import { getRequestEvent, isServer } from "solid-js/web";

// biome-ignore lint/style/noNonNullAssertion: getRequestEvent always returns a value on the server
export const getUrl = () => new URL(isServer ? getRequestEvent()!.request.url : window.location.href);
