import React from "react";

import { Box, Button, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 700,
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
    console.log("Accepting lesson:" + props.selectedEventId);
    props.setOpenAcceptModal(false);
  };

  const handleDecline = () => {
    console.log("Declining lesson:" + props.selectedEventId);
    props.setOpenAcceptModal(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const calendarApi = props.cal.current.getApi();
    calendarApi.unselect();
    props.setOpenAcceptModal(false);
  };

  return (
    <Modal
      open={props.openAcceptModal}
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
