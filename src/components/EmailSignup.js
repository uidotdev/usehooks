import React, { Fragment } from "react";
import fetch from "unfetch";
import styled from "styled-components";

class EmailSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: false,
      emailInputValue: ""
    };
  }

  subscribe = async email => {
    this.setState({ subscribed: true });

    const response = await new Promise((resolve, reject) => {
      fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      })
        .then(r => r.json())
        .then(data => {
          resolve(data);
        });
    });
  };
  render() {
    const { subscribed } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          {subscribed ? (
            <div className="has-text-centered has-text-weight-semibold">
              You are subscribed&nbsp;&nbsp;🎉
            </div>
          ) : (
            <Fragment>
              <Title>📩&nbsp;&nbsp;Get new recipes in your inbox</Title>

              <form
                onSubmit={event => {
                  event.preventDefault();
                  const email = this.state.emailInputValue;
                  if (email) {
                    this.subscribe(email);
                  }
                }}
              >
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      type="email"
                      className="input"
                      placeholder="Your Email"
                      onChange={event => {
                        this.setState({
                          emailInputValue: event.target.value
                        });
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
              <Extra>Join 1,604 subscribers. No spam ever.</Extra>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const Title = styled("div").attrs({ className: "subtitle is-5" })`
  margin-bottom: 1.2rem;
`;

const Extra = styled("div")`
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export default EmailSignup;
