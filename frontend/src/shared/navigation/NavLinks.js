import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import UserContext from "../../util/UserContext";

const NavLinks = (props) => {
  const { user } = useContext(UserContext); // get user for which the links are generated

  return (
    <Stack spacing={2} direction="row">
      {user[0] === "Student" && (
        <Button>
          <NavLink to="/" style={{ textDecoration: 'none' }}>Find lesson</NavLink>
        </Button>
      )}
      {user[0] === "Teacher" && (
        <Button>
          <NavLink to="/schedule" style={{ textDecoration: 'none' }}>Schedule</NavLink>
        </Button>
      )}
      <Button >
        <NavLink to="/lessons" style={{ textDecoration: 'none' }}>Lessons</NavLink>
      </Button>
      <Button>
        <NavLink to="/profile" style={{ textDecoration: 'none' }}>Profile</NavLink>
      </Button>
      <Button>
        <NavLink to="/signup" style={{ textDecoration: 'none' }}>Signup</NavLink>
      </Button>
    </Stack>
  );
};

export default NavLinks;
