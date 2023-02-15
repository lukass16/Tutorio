import React, { useState } from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

import AcceptLessonModal from "../../shared/modals/AcceptLessonModal";

const LessonCard = (props) => {
  let initialBackGroundColor = "#ffffff";
  if (props.status == "REQUESTED") {
    initialBackGroundColor = "#A020F0";
  } else if (props.status == "ACCEPTED") {
    initialBackGroundColor = "#98FB98";
  } else if (props.status == "PENDING") {
    initialBackGroundColor = "#A9A9A9";
  } else if (props.status == "FINISHED") {
    initialBackGroundColor = "#696969";
  }

  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [status, setStatus] = useState(props.status);
  const [backGroundColor, setBackGroundColor] = useState(
    initialBackGroundColor
  );

  const handleChangeCardStatus = (status) => {
    setStatus(status);
    if (status == "FINISHED") {
      setBackGroundColor("#696969");
    } else if (status == "PENDING") {
      setBackGroundColor("#A9A9A9");
    } else if (status == "ACCEPTED") {
      setBackGroundColor("#98FB98");
    } else if (status == "REQUESTED") {
      setBackGroundColor("#A020F0");
    } else {
      setBackGroundColor("#ffffff");
    }
  };

  //! testing
  let startDate = new Date(props.start);
  let endDate = new Date(props.end);

  const handleRespondClick = () => {
    setOpenAcceptModal(true);
  };

  return (
    <>
      <AcceptLessonModal
        open={openAcceptModal}
        setOpenAcceptModal={setOpenAcceptModal}
        selectedEventId={props.id}
        handleChangeCardStatus={handleChangeCardStatus}
      />
      <Card
        key={props.id}
        sx={{
          my: 3,
          height: "100px",
          display: "flex",
          flexDirection: "row",
          backgroundColor: backGroundColor,
        }}
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
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">{props.subject}</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">{props.teacher}</Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
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
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {status != "AVAILABLE" && (
            <Button onClick={handleRespondClick}>Respond</Button>
          )}
        </Box>
      </Card>
    </>
  );
};

export default LessonCard;
