const analytics = {
  track(...args) {
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible.apply(this, [...args]);
    }
  },
};

export default analytics;
