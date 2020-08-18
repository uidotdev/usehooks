import analytics from "./src/utils/analytics.js";

export function onClientEntry() {}

export function onRouteUpdate({ location }) {
  analytics.page();
}
