import analytics from "./src/utils/analytics.js";

require("prismjs/themes/prism-dark.css");

export function onClientEntry() {}

export function onRouteUpdate({ location }) {
  analytics.page();
}
