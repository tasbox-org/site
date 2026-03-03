import { getRequestEvent, isServer } from "solid-js/web";

export const getUrl = () => new URL(isServer ? getRequestEvent()!.request.url : window.location.href);
