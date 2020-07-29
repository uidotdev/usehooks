import Analytics from "analytics";
import googleAnalyticsPlugin from "@analytics/google-analytics";

const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
    googleAnalyticsPlugin({
      trackingId: "UA-195006-22"
    })
  ]
});

export default analytics;
