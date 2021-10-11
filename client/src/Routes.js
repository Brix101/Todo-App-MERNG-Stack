import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import { AuthContext } from "./context/auth";

function Routes() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Switch>
          {!user || user === null ? (
            <>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route>
                <Redirect to="/login" />
              </Route>
            </>
          ) : (
            <>
              {" "}
              <Route exact path="/" component={Home} />
              <Route>
                <Redirect to="/" />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default Routes;
