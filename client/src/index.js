import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import Signin from "./components/Auth/SignIn";
import Signup from "./components/Auth/SignUp";

import * as serviceWorker from "./serviceWorker";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token} ` : ""
    }
  };
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
client
  .query({
    query: gql`
      {
        hello
      }
    `
  })
  .then(result => console.log(result))
  .catch(err => console.log(err));

const Root = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
