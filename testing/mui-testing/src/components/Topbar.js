import React from "react";

import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const Topbar = (props) => {
  return (
    // Main box
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box>
        <img src="../../../public/assets/fulltitle.png" alt="logo"></img>
      </Box>

      <Box display="flex">
      </Box>
    </Box>
  );
};

export default Topbar;
