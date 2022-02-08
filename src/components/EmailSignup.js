import React, { useState } from "react";
import { useStaticQuery } from "gatsby";
import fetch from "unfetch";
import styled from "styled-components";
import toast from "react-hot-toast";
import analytics from "./../utils/analytics.js";

function sendBytesOptIn({ email, source }) {
  return fetch(`https://bytes.dev/api/bytes-optin-cors`, {
    method: "POST",
    body: JSON.stringify({ email, source }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

function useBytesCount() {
  const {
    bytes: { subcount },
  } = useStaticQuery(graphql`
    query subCountQuery {
      bytes {
        subcount
      }
    }
  `);

  return subcount;
}

const EmailSignup = () => {
  const subcount = useBytesCount();
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    setIsLoading(true);
    return sendBytesOptIn({ email, source: "useHooks" }).then((res) => {
      if (res.error) {
        setEmail("");
        setIsLoading(false);
        return toast.error(
          "There was an error. Check to see if your email is correct."
        );
      }
      analytics.track("subscribe");
      setSubscribed(true);
      setIsLoading(false);
      setEmail("");
      return toast.success(`Check your email to confirm your subscription.`);
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        {subscribed ? (
          <div className="has-text-centered has-text-weight-semibold">
            You are subscribed&nbsp;&nbsp;
            <span role="img" aria-label="party">
              🎉
            </span>
          </div>
        ) : (
          <>
            <h4 className="subtitle is-5">
              <span role="img" aria-label="letter">
                📩
              </span>
              &nbsp;&nbsp;Subscribe to Bytes
            </h4>
            <p>
              Most newsletters are terrible. Thats why we created Bytes. Our
              goal was to create a JavaScript newsletter that was both
              educational and entertaining. <b>{subcount.toLocaleString()}</b>{" "}
              subscribers and an almost 50% weekly open rate later, it looks
              like{" "}
              <a
                target="_blank"
                href="https://twitter.com/uidotdev/timelines/1428028877129936899"
              >
                we did it
              </a>{" "}
              ...
            </p>
            <br />

            <form onSubmit={subscribe}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    type="email"
                    className="input"
                    placeholder="Your Email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="control">
                  <button
                    disabled={isLoading}
                    className="button is-primary has-text-weight-semibold"
                    type="submit"
                  >
                    {isLoading ? "Loading..." : "Subscribe"}
                  </button>
                </div>
              </div>
            </form>
            <Extra>
              Join {subcount.toLocaleString()} subscribers. {""}
              <a href="https://bytes.dev/archives" target="_blank">
                See the most recent issue.
              </a>
            </Extra>
          </>
        )}
      </div>
    </div>
  );
};

const Extra = styled("div")`
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export default EmailSignup;
