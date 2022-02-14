const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === "production") {
    const scriptProps = {
      defer: true,
      "data-domain": "usehooks.com",
      src: `https://pl-proxy.uidotdev.workers.dev/js/script.js`,
    };

    return setHeadComponents([
      <script key="custom-plausible-plugin" {...scriptProps}></script>,
      <script
        key="custom-plausible-plugin-custom-events"
        dangerouslySetInnerHTML={{
          __html: `
          window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
        }}
      />,
    ]);
  }

  return null;
};
