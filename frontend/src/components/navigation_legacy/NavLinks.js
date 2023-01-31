import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">Find lesson</NavLink>
      </li>
      <li>
        <NavLink to="/schedule">Schedule</NavLink>
      </li>
      <li>
        <NavLink to="/lessons">Lessons</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
