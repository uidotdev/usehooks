const ZAP_URL = "https://hooks.zapier.com/hooks/catch/287044/bfjyeuc/";

const slackChannelsMap = {
  "course-comments": "C02FXNTHLMQ",
  "lesson-feedback": "C02D75KBL8H",
  reviews: "C018PDMLYBV",
  "platform-errors": "C03MKKYU5AM",
};

export function postPlatformErrorToSlack(msg: string) {
  return fetch(ZAP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channelId: slackChannelsMap["platform-errors"],
      msg,
    }),
  });
}

export default function postToSlack(msg: string) {
  return fetch(ZAP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channelId: "C03PEQZ4HJQ",
      msg,
    }),
  });
}
