const fetch = require("node-fetch");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  try {
    const res = await fetch(`https://bytes.dev/api/subcount`).then((res) =>
      res.json()
    );

    if (res.error) {
      throw res.error;
    }

    actions.createNode({
      subcount: res.subcount,
      id: createNodeId(`bytes-subcount`),
      internal: {
        type: "bytes",
        contentDigest: createContentDigest({ subcount: res.subcount }),
      },
    });
  } catch (e) {
    console.log(`Error in custom-bytes-subscriber-count-plugin`, e.message);
  }
};
