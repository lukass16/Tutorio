import React from "react";

import { NavLink } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const NavLinks = (props) => {
  return (
    <Stack spacing={2} direction = "row">
      <Button>
        <NavLink to="/">Find lesson</NavLink>
      </Button>
      <Button>
        <NavLink to="/schedule">Schedule</NavLink>
      </Button>
      <Button>
        <NavLink to="/lessons">Lessons</NavLink>
      </Button>
      <Button>
        <NavLink to="/profile">Profile</NavLink>
      </Button>
      <Button>
        <NavLink to="/signup">Signup</NavLink>
      </Button>
    </Stack>
  );
};

export default NavLinks;
