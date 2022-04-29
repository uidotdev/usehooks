import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
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
              <figure
                style={{
                  display: "inline-block",
                  position: "relative",
                  top: "12px",
                }}
              >
                <img
                  width={40}
                  height={40}
                  src="/images/bytes-logo.png"
                  alt="Bytes"
                />
              </figure>
              &nbsp;&nbsp; Subscribe to Bytes
            </h4>
            <p>
              Your weekly dose of JavaScript news. Delivered every monday to{" "}
              <b>{subcount.toLocaleString()}</b> devs, for free.
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
                    style={{ backgroundColor: "#ED203D" }}
                    disabled={isLoading}
                    className="button is-primary has-text-weight-semibold"
                    type="submit"
                  >
                    {isLoading ? "Loading..." : "Get Bytes"}
                  </button>
                </div>
              </div>
            </form>
            <Extra>
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
