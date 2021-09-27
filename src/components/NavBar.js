import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar({ isLoggedIn }) {
  return (
    <>
      <ul className="ul_navBar">
        <li className="li_navBar">
          <Link to="/" className="link_navBar">
            Retro-Nwitter
          </Link>
        </li>
        <li className="li_navBar">
          {isLoggedIn ? (
            <Link to="/profile" className="link_navBar">
              Profile
            </Link>
          ) : (
            <Link to="/login" className="link_navBar">
              LogIn
            </Link>
          )}
        </li>
      </ul>
      <hr className="line_navBar"></hr>
    </>
  );
}

export default NavBar;
