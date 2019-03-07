---
templateKey: post
title: useSocket
date: "2019-03-06"
gist: https://gist.github.com/caseybaggz/0a2d2e3f260c688f19cf4ba10f93af16
sandbox: "https://codesandbox.io/s/wknyvpzv9k"
code: "// @flow

import React from 'react';
import isEmpty from 'lodash.isEmpty';

type Response = {
  messages: {},
  errors: {},
  emit: (name: string, payload?: {}, options?: {}) => {}
};

/* 
Helper function that looks at the response and checks if successful status
or not if the server sends back messages with the following pattern:
{
  status: 200,
  data: <return message>
}
This is also not mandatory or a required socket design coming from the server.
Rather it's just a pattern the team I'm on is using in order to leverage
REST methods for sockets.
*/
export async function checkSocketStatus(response: WSResponse) {
  const { status, data } = response;

  if ((status >= 200 && status < 300) || status === 424) {
    return { data, status };
  } else if (status === 500) {
    let error: ErrorResponse = new Error(data.message);
    error.serverError = true;
    error.status = status;
    // logRocket or other tool you use
    sendBugReport(error, { serverError: true });
    throw error;
  } else {
    let error: ErrorResponse = new Error(data.message);
    error.message = data.message;
    error.status = status;
    throw error;
  }
}

// hook -> Relies on a SocketContext to have been created exposing an emit function
export default function useSocket(
  name: string,
  handleCleanup?: boolean = false
): Response {
  // Your context should set up the WS connection and handle all 
  // methods of the WS Object
  const socket = React.useContext(SocketContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [messages, setMessages] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  function emit(payload?: {}, options?: {}) {
    if (!isLoading) {
      setIsLoading(true);
    }

    if (!isEmpty(errors)) {
      setErrors(null);
    }

    socket.emit(name, payload, options);
  }

  React.useEffect(() => {
    const { messages } = socket;
    // filter the messages to find current response in scope
    const response: WSResponse = messages && messages[name];

    if (isEmpty(response)) {
      return;
    }

    // check to make sure it's a healthy response
    checkSocketStatus(response)
      .then(responseBody => {
        setMessages(responseBody);

        // if handleCleanup is true, remove the message from the lis
        // after 10s (good for form messages (i.e. "Your password has been updated")
        if (handleCleanup) {
          setTimeout(() => {
            socket.removeMessage(name);
          }, 10000);
        }

        setIsLoading(false);
      })
      .catch(e => {
        if (response.status === 404) {
          // keep in loading state
          return;
        }

        setIsLoading(false);

        if (e.serverError) {
          setErrors({ serverError: true });
          return;
        }
      });
  }, [socket.messages]);

  return [messages, errors, emit, isLoading];
}


// example
function App(): React.Node {
   // create different socket messages
   const [messages, errors, emit, isLoading] = useSocket('CHANNELS_LIST');
   const [optionMessages, optionErrors, optionEmit, optionIsLoading] = useSocket('CHANNELS_OPTIONS');
   const messageContent = React.useMemo(() => getMessages(), [messages, errors, isLoading]);
   const optionContent = React.useMemo(() => getOptions(), [optionMessages, optionErrors, optionIsLoading]);
  
   function getMessages(): React.Node {
     if (isEmpty(messages)) {
       return null;
     }
     
     // Replace with Suspense when released
     if (isLoading) {
       return <LoadingEl />;
     }
     
     return messages.data.map(obj => (
       <Message key={obj.id} {...obj} />;
     ));
   }
  
  function getOptions(): React.Node {
     if (isEmpty(optionMessages)) {
       return null;
     }
     
     // When Suspense supports data caching, we can remove isLoading
     // and wrap the content in Suspense
     if (isLoading) {
       return <LoadingEl />;
     }
     
     return optionMessages.data.map(obj => (
       <Option key={obj.id} {...obj} />;
     ));
   }
  
   React.useEffect(() => {
     if (isEmpty(messages)) {
        emit();
     }
   }, []);
  
   React.useEffect(() => {
     if (isEmpty(optionMessages)) {
        optionEmit();
     }
   }, []);
  
  return (
    <div>
      <ServerBoundary serverError={!isEmpty(errors)}>
         <ul>{messageContent}</ul>
      </ServerBoundary>
    
      <ServerBoundary serverError={!isEmpty(opitonErrors)}>
         <ul>{optionContent}</ul>
      </ServerBoundary>
    </div>
  );
}"
---

This hook allows you to send WebSocket messages throughout your app sourcing from one connection created from a Socket Context. You can see how we set up the Socket Context in our sandbox example.

In the example we call the useSocket hook two times to display the results of the message or error in the UI. Additionally 
we show how easy it to use memiozation with useMemo to cache the results so re-renders are reserved for if the socket results change.

**Sockets rely on a socket server to be created**
Our example uses a dummy demo server at websocket.org/echo.html for easy testing, but you will need your own socket server to use WebSockets in general.
