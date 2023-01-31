import React from "react";

import { Box, Typography } from "@mui/material";

const Profile = (props) => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        {/* MENU SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor="theme.secondary"
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5"> PLACEHOLDER </Typography>
        </Box>

        {/* PROFILE */}
        <Box flex="1 1 100%" ml="15px">
          <Typography variant="h3"> PLACEHOLDER </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
