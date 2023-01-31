import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";

import "./NavBar.css";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between", mx: 20 }}
      >
        {/*Logo*/}
        <Box flexGrow={1}>
          <img src="/assets/fulltitle.svg" className="logo" />
        </Box>
        <Box display="flex">
          <Button
            variant="h5"
            sx={{
              my: 2,
              color: "dark",
              display: "block",
              backgroundColor: "secondary",
              px: 10,
            }}
          >
            Profile
          </Button>
          <Button
            variant="h5"
            sx={{ my: 2, color: "dark", display: "flex", px: 10 }}
          >
            Lessons
          </Button>
          <Button
            variant="h5"
            sx={{ my: 2, color: "dark", display: "flex", px: 10 }}
          >
            Schedule
          </Button>
          <Button
            variant="h5"
            sx={{ my: 2, color: "dark", display: "flex", px: 10 }}
          >
            Find lessons
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
