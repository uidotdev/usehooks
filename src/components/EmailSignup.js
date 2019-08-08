import React, { Fragment, useState } from 'react';
import fetch from 'unfetch';
import styled from 'styled-components';

const EmailSignup = () => {
   const [subscribed, setSubscribed] = useState(false);
   const [emailInputValue, setEmailInputValue] = useState('');

   const subscribe = async email => {
      setSubscribed(true);
      try {
         await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
         });
      } catch (error) {
         console.error(error);
      }
   };

   const handleSubmit = e => {
      e.preventDefault();
      Boolean(emailInputValue) && subscribe(emailInputValue);
   };

   return (
      <div className='card'>
         <div className='card-content'>
            {subscribed ? (
               <div className='has-text-centered has-text-weight-semibold'>You are subscribed&nbsp;&nbsp;🎉</div>
            ) : (
               <Fragment>
                  <Title>📩&nbsp;&nbsp;Get new recipes in your inbox</Title>

                  <form onSubmit={handleSubmit}>
                     <div className='field has-addons'>
                        <div className='control is-expanded'>
                           <input
                              type='email'
                              className='input'
                              placeholder='Your Email'
                              onChange={e => setEmailInputValue(e.target.value)}
                           />
                        </div>
                        <div className='control'>
                           <button className='button is-primary has-text-weight-semibold' type='submit'>
                              Subscribe
                           </button>
                        </div>
                     </div>
                  </form>
                  <Extra>Join 5,043 subscribers. No spam ever.</Extra>
               </Fragment>
            )}
         </div>
      </div>
   );
};

const Title = styled('div').attrs({ className: 'subtitle is-5' })`
  margin-bottom: 1.2rem;
`;

const Extra = styled('div')`
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
`;

export default EmailSignup;
