import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/auth";
import { LOGIN_USER } from "../../graphql/mutations/User";

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { data, loading }] = useMutation(LOGIN_USER);

  if (data) {
    const userDate = data.login;
    context.login(userDate);
    history.push("/");
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await loginUser({
        variables: { username: username, password: password },
      });
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  }
  return (
    <div className="main-form">
      {loading && (
        <div className="modal">
          <div className="loading"></div>
        </div>
      )}
      <div className="app-bg bg-float-form">
        <h1 className="app-title">Login</h1>
        <form className="Form login-form" onSubmit={onSubmit} valid>
          <div className="login-input">
            <input
              className="input-primary"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="login-input">
            <input
              type="password"
              className="input-primary "
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button className="Button btn-primary login-button">
            Login
            <span className="btn-tl"></span>
          </button>
          <Link to="/register"> Sign Up? </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
