import React from "react";

import { Box, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
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

  const handleCloseEditModal = () => {
    props.setEditing(false);
    props.setOpenEditModal(false);
  };

  const handleCancel = (e) => {
    if (props.editing) {
      e.preventDefault();
      const calendarApi = props.cal.current.getApi();
      calendarApi.unselect();
      props.setOpenEditModal(false);
      props.setEditing(false);
    } else {
      e.preventDefault();
      props.setOpenEditModal(false);
    }
  };

  const handleDelete = () => {
    const calendarApi = props.cal.current.getApi();

    let resStatus;
    fetch(`http://localhost:5000/api/lessons/${props.selectedEventId}`, {
      method: "DELETE",
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

        // change what needs to be changed on the client side
        calendarApi.getEventById(props.selectedEventId).remove();

        // testing
        console.log("Successfully deleted lesson/event");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    props.setEditing(false);
    props.setOpenEditModal(false);
  };

  // using the Formik hook
  const formik = useFormik({
    initialValues: {
      subject: "",
      place: "",
      price: "",
    },
    onSubmit: (values) => {
      if (props.editing) {
        const calendarApi = props.cal.current.getApi();
        const currentEvent = calendarApi.getEventById(props.selectedEventId);

        const updatedLesson = {
          subject: values.subject,
          price: values.price,
          start: currentEvent.start,
          end: currentEvent.end,
          place: values.place,
          teacherId: props.user[1],
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
            // if response failed
            if (resStatus === 500) {
              throw new Error(data.message);
              return;
            }

            // change what needs to be changed on the client side
            currentEvent.setProp("title", values.subject);

            // testing
            console.log("Successfully updated lesson/event");
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });

        //set end edit mode
        props.setEditing(false);

        props.setOpenEditModal(false);

      } else {
        const calendarApi = props.cal.current.getApi();

        const newLesson = {
          subject: values.subject,
          price: values.price,
          start: props.selectedEvent.start,
          end: props.selectedEvent.end,
          place: values.place,
          teacherId: props.user[1],
        };

        // add lesson to database
        let _id;
        let resStatus;
        fetch("http://localhost:5000/api/lessons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newLesson,
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
            _id = data.lesson._id; // should eventually add better error handling here

            const newEvent = {
              id: _id,
              title: values.subject,
              start: props.selectedEvent.start,
              end: props.selectedEvent.end,
              allDay: props.selectedEvent.allDay,
            };

            calendarApi.addEvent(newEvent);

            // testing
            console.log("Successfully new lesson/event");
            console.log(newEvent);
          })
          .catch((err) => {
            console.log(err);
          });

        props.setOpenEditModal(false);
        calendarApi.unselect();
      }
    },
  });

  return (
    <Modal
      open={props.open ?? false}
      onClose={handleCloseEditModal}
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
        <Typography variant="h6">Confirm Lesson</Typography>
        <div>
          <TextField
            required
            id="subject"
            name="subject"
            label="Subject"
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subject}
          />
          <TextField
            required
            id="place"
            name="place"
            label="Place"
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.place}
          />
          <TextField
            required
            id="price"
            name="price"
            label="Price"
            variant="filled"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
        </div>
        <Button type="submit">{props.editing ? "Update" : "Submit"}</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        {props.editing && (
          <Button onClick={handleDelete} variant="danger">
            Delete
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default EditLessonModal;