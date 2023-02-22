import React from "react";

import { Box, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import Modal from "@mui/material/Modal";

import { colors } from "../../util/theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegisterLessonModal = (props) => {
  // using the Formik hook
  const formik = useFormik({
    initialValues: {
      comment_from_st: "",
    },
    onSubmit: (values) => {
      const calendarApi = props.cal.current.getApi();
      const currentEvent = calendarApi.getEventById(props.selectedEventId);
      const updatedLesson = {
        comment_from_st: values.comment_from_st,
      };

      if (props.editing) {
        let resStatus;

        updatedLesson.status = "REQUESTED";
        // sending changes to database
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
            // if response failed
            if (resStatus === 500) {
              throw new Error(data.message);
              return;
            }
            console.log("Updated lesson");
            console.log(data.lesson);
          })
          .catch((err) => {
            console.log(err);
          });

        props.setOpenRegisterModal(false);
      } else {
        let resStatus;
        // setting lesson status as requested
        updatedLesson.status = "REQUESTED";
        updatedLesson.studentId = props.user[1];

        // sending changes to database
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
            // if response failed
            if (resStatus === 500) {
              throw new Error(data.message);
              return;
            }
            console.log("Registered lesson");
            console.log(data.lesson);

            // add any necessary changes to the client side
            currentEvent.setProp("backgroundColor", colors["REQUESTED"]);
            currentEvent.setExtendedProp("hasRegistered", "true");
          })
          .catch((err) => {
            console.log(err);
          });

        props.setOpenRegisterModal(false);
      }
    },
  });

  const handleClose = () => {
    const calendarApi = props.cal.current.getApi();
    props.setEditing(false);
    props.setOpenRegisterModal(false);
    calendarApi.unselect();
  };

  const handleCancel = (e) => {
    const calendarApi = props.cal.current.getApi();
    calendarApi.unselect();
    props.setEditing(false);
    e.preventDefault();
    props.setOpenRegisterModal(false);
  };

  const handleUnregister = () => {
    const calendarApi = props.cal.current.getApi();
    const currentEvent = calendarApi.getEventById(props.selectedEventId);
    const updatedLesson = {};

    updatedLesson.comment_from_st = "";
    updatedLesson.status = "AVAILABLE";
    updatedLesson.studentId = "removed"; // if studentId is "removed", this indicates the controler to perform a removing action

    let resStatus;
    // sending changes to database
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
        // if response failed
        if (resStatus === 500) {
          throw new Error(data.message);
          return;
        }
        console.log("Unregistered lesson");
        console.log(data.lesson);

        // add any necessary changes to the client side
        currentEvent.setProp("backgroundColor", colors["AVAILABLE"]);
        currentEvent.setExtendedProp("hasRegistered", "false");
      })
      .catch((err) => {
        console.log(err);
      });

    props.setEditing(false);
    props.setOpenRegisterModal(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={modalStyle}
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6">Register for Lesson</Typography>
        <div>
          <TextField
            required
            id="comment_from_st"
            name="comment_from_st"
            label="Comments for lesson"
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
        </div>
        <Button type="submit">{props.editing ? "Update" : "Register"}</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        {props.editing && (
          <Button onClick={handleUnregister} variant="danger">
            Unregister
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default RegisterLessonModal;
