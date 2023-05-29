// @ts-ignore
const api_key = import.meta.env.PUBLIC_CONVERTKIT_PUBLIC_API_KEY;

export async function addTagToEmail(tag, { email, from, type, ip }) {
  const json = await fetch(
    `https://api.convertkit.com/v3/tags/${tag}/subscribe`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        api_key,
        fields: {
          from,
          type,
          ip,
        },
      }),
      headers: {
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  )
    .then((res) => res.json())
    .catch((e) => {
      throw new Error(e);
    });

  if (json.error) {
    console.log(json.error);
    throw new Error(json.message);
  }

  return json.subscription;
}