import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="main-form">
      <div className="app-bg bg-float-form ">
        <h1 className="app-title">Register</h1>
        <form className="Form login-form" onSubmit={handleSubmit}>
          <div className="InputBox login-input">
            <input
              className="input-primary"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          </div>
          <div className="InputBox login-input">
            <input
              className="input-primary"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="InputBox  login-input">
            <input
              className="input-primary "
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="InputBox  login-input">
            <input
              className="input-primary "
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>

          <button className="Button btn-primary login-button">
            Register
            <span className="btn-tl"></span>
          </button>
          <Link to="/login"> Login? </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
