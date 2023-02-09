import React from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

const LessonCard = (props) => {

  let startDate = new Date(props.start);
  let endDate = new Date(props.end);

  return (
    <Card
      key={props.id}
      sx={{ my: 3, height: "100px", display: "flex", flexDirection: "row" }}
    >
      <Box
        sx={{
          width: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">{props.it}</Typography>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">{props.subject}</Typography>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">{props.teacher}</Typography>
      </Box>
      <Box
        sx={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box width={"100%"}>
            <Typography align="left" variant="subtitle">
              {"Start: " + startDate.getDay()}
            </Typography>
          </Box>
          <Box width={"100%"}>
            <Typography align="left" variant="subtitle">
              {"End: " + endDate.getDay()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default LessonCard;
