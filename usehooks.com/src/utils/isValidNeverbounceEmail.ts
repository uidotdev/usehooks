import { postPlatformErrorToSlack } from "./postToSlack";

async function check(email: string) {
  const apiKey = "private_68a152b01da35a482e0f50dc60f541df";
  const encodedEmail = encodeURIComponent(email);

  return fetch(
    `https://api.neverbounce.com/v4.2/single/check?key=${apiKey}&email=${encodedEmail}`,
    {
      method: "GET",
    }
  ).then((r) => r.json());
}

export default async function isValidNeverBounceEmail(email) {
  return check(email).then(
    ({ result }) => {
      // https://neverbounce.com/help/understanding-and-downloading-results/result-codes#valid
      return ["valid", "catchall", "unknown"].includes(result);
    },
    (err) => {
      switch (err.type) {
        case "AuthError":
          postPlatformErrorToSlack(
            "The API credentials for NeverBounce aren't working."
          );
          break;
        case "BadReferrerError":
          postPlatformErrorToSlack(
            "NeverBounce is being used from an unauthorized source"
          );
          break;
        case "ThrottleError":
          postPlatformErrorToSlack("NeverBounce has been rate limited");
          break;
        default:
          console.warn("Neverbounce issue: ", err);
          postPlatformErrorToSlack(
            `Neverbounce is having issues: ${err.message}`
          );
          break;
      }
    }
  );
}
