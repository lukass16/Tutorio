import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import MainHeader from "./MainHeader";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <>
        <h1 className="main-navigation__title">
          <Link to="/">Tutorio</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </>
    </MainHeader>
  );
};

export default MainNavigation;
