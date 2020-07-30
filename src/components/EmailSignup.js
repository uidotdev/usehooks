import React, { useState } from "react";
import fetch from "unfetch";
import styled from "styled-components";
import analytics from "./../utils/analytics.js";

const EmailSignup = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const subscribe = event => {
    event.preventDefault();
    if (!email) return;
    analytics.track("subscribe");
    setSubscribed(true);
    return fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    }).then(r => r.json());
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
            <Title>
              <span role="img" aria-label="letter">
                📩
              </span>
              &nbsp;&nbsp;Get new recipes in your inbox
            </Title>
            <form onSubmit={subscribe}>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    type="email"
                    className="input"
                    placeholder="Your Email"
                    onChange={event => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="control">
                  <button
                    className="button is-primary has-text-weight-semibold"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
            <Extra>Join 7,031 subscribers. No spam ever.</Extra>
          </>
        )}
      </div>
    </div>
  );
};

const Title = styled("div").attrs({ className: "subtitle is-5" })`
  margin-bottom: 1.2rem;
`;

const Extra = styled("div")`
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export default EmailSignup;
