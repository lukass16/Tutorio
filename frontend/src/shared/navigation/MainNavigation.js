import React from "react";

import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from '@mui/material/Container';

import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between"}}>
          <Box>
            <Link to="/">
              Tutorio
            </Link>
          </Box>
          <Box>
            <NavLinks />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavigation;
