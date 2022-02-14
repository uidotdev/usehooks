exports.onRouteUpdate = function ({ location }) {
  if (
    process.env.NODE_ENV === `production` &&
    typeof window.plausible === `object`
  ) {
    const pathIsExcluded =
      location &&
      typeof window.plausibleExcludePaths !== `undefined` &&
      window.plausibleExcludePaths.some((rx) => rx.test(location.pathname));

    if (pathIsExcluded) return null;

    window.plausible("pageview");
  }
};