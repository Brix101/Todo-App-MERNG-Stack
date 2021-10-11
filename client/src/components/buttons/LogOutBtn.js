import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";

function LogOutBtn() {
  const context = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    context.logout();
    history.push("/login");
  };
  return (
    <button onClick={logout} className="Button btn-primary login-button">
      logout
    </button>
  );
}

export default LogOutBtn;
