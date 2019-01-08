//require("now-env"); For loading secrets in local dev: https://github.com/zeit/now-env
const { send, json } = require("micro");

const apiKey = process.env.mailchimp_api_key;
const listId = process.env.mailchimp_list_id;

const mailchimp = new (require("mailchimp-api-v3"))(apiKey);

module.exports = async (req, res) => {
  const data = await json(req);

  mailchimp
    .request({
      method: "POST",
      path: `/lists/${listId}/members`,
      body: {
        email_address: data.email,
        // Set status to "pending" (double-opt-in) or "subscribed"
        status: "subscribed"
      }
    })
    .then(result => {
      send(res, 200, {
        success: true
      });
    })
    .catch(err => {
      console.log("Error", err);
      send(res, err.status, {
        error: true,
        status: err.status,
        title: err.title,
        detail: err.detail
      });
    });
};
