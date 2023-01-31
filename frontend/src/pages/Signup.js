import React from "react";

import { Box, Card, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Signup = (props) => {
  return (
    <Container sx={{flexDirection: "column", display: "flex", alignItems: "center"}}>
      <Card
        display="flex"
        justifyContent="center"
        sx={{ my: "30px", height: "700px", width: "500px" }}
      >
        {/* Form */}
        <Box flex="1 0 100%" display="flex" justifyContent="center">
          Text
        </Box>
      </Card>
    </Container>
  );
};

export default Signup;
