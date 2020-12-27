import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";

const Header = (user) => {
  return (
    <nav className="nav-bar">
      <div className="logo">Byteridge</div>
      <div className="spacer"></div>
      {user && user.user && (
        <ul className="links">
          <Link to="/">Dashboard</Link>
          {user.user.role === "AUDITOR" && <Link to="/audit">Audit</Link>}
          <Link to="/login">Logout</Link>
        </ul>
      )}
    </nav>
  );
};

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const connectedHeader = connect(mapState)(Header);
export { connectedHeader as Header };
