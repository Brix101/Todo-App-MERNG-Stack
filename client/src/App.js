import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//?STYLES
import "./styles/index.css";
import "./styles/App.css";
import "./styles/Button.css";
import "./styles/Form.css";
import "./styles/InputBox.css";
import "./styles/Login.css";
import "./styles/Todo.css";
import "./styles/Todos.css";

import { AuthProvider } from "./context/auth";
import Routes from "./Routes";

const App = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:5000/",
  });

  const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <div className="App">
          <div className="app-bg bg-top"></div>
          <Routes />
        </div>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
