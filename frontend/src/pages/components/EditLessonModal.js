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
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={modalStyle}
        component="form"
        onSubmit={props.onSubmit}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6">Confirm Lesson</Typography>
        <div>
          <TextField
            required
            id="subject"
            name="subject"
            label="Subject"
            variant="filled"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.subject}
          />
          <TextField
            required
            id="place"
            name="place"
            label="Place"
            variant="filled"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.place}
          />
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            variant="filled"
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.price}
          />
        </div>
        <Button type="submit">{props.editing ? "Update" : "Submit"}</Button>
        <Button onClick={props.handleCancel}>Cancel</Button>
        {props.editing && (
          <Button onClick={props.handleDelete} variant="danger">
            Delete
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default EditLessonModal;
