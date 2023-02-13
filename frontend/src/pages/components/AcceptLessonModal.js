import React from "react";

import { Box, Button, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditLessonModal = (props) => {
  const handleCloseAcceptModal = () => {
    props.setOpenAcceptModal(false);
  };

  const handleAccept = () => {
    const calendarApi = props.cal.current.getApi();
    const currentEvent = calendarApi.getEventById(props.selectedEventId);

    const updatedLesson = {
      status: "ACCEPTED",
    };

    let resStatus;
    fetch(`http://localhost:5000/api/lessons/${props.selectedEventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedLesson,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((data) => {
        if (resStatus === 500) {
          throw new Error(data.message);
          return;
        }

        // change what needs to be changed on the client side
        currentEvent.setProp("backgroundColor", "#98FB98");
        currentEvent.setExtendedProp("status", "ACCEPTED");

        // testing
        console.log("Accepted lesson:" + props.selectedEventId);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    props.setOpenAcceptModal(false);
  };

  const handleDecline = () => {
    const calendarApi = props.cal.current.getApi();
    const currentEvent = calendarApi.getEventById(props.selectedEventId);

    const updatedLesson = {
      status: "AVAILABLE",
      studentId: "declined"
    };

    let resStatus;
    fetch(`http://localhost:5000/api/lessons/${props.selectedEventId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updatedLesson,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((data) => {
        if (resStatus === 500) {
          throw new Error(data.message);
          return;
        }

        // change what needs to be changed on the client side
        currentEvent.setProp("backgroundColor", undefined);
        currentEvent.setExtendedProp("status", "AVAILABLE");

        // testing
        console.log("Declining lesson:" + props.selectedEventId);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    props.setOpenAcceptModal(false);
  };

  const handleCancel = () => {
    const calendarApi = props.cal.current.getApi();
    calendarApi.unselect();
    props.setOpenAcceptModal(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleCloseAcceptModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Button onClick={handleAccept}>Accept</Button>
        <Button onClick={handleDecline}>Decline</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Modal>
  );
};

export default EditLessonModal;
