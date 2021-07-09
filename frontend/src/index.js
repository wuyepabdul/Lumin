import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import store from "./redux/store";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.forEach(({ message }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_API }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
