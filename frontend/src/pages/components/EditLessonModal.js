import React, { useState } from "react";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
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
  const [start, setStart] = useState(props.selectedEvent.start.valueOf());
  const [end, setEnd] = useState(props.selectedEvent.end.valueOf());


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
      const newStart = new Date(start);
      const newEnd = new Date(end);

      if (props.editing) {
        const calendarApi = props.cal.current.getApi();
        const currentEvent = calendarApi.getEventById(props.selectedEventId);

        const updatedLesson = {
          subject: values.subject,
          price: values.price,
          start: newStart,
          end: newEnd,
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
            currentEvent.setStart(newStart);
            currentEvent.setEnd(newEnd);

            console.log("New Start: ", newStart);

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
          start: newStart,
          end: newEnd,
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
              start: newStart,
              end: newEnd,
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <Box>
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
          </Box>
          <Box sx={{ my: 2 }}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Start"
              value={start}
              onChange={(newStart) => {
                setStart(newStart);
              }}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="End"
              value={end}
              onChange={(newEnd) => {
                setEnd(newEnd);
              }}
            />
          </Box>
          <Button type="submit">{props.editing ? "Update" : "Submit"}</Button>
          <Button onClick={handleCancel}>Cancel</Button>
          {props.editing && (
            <Button onClick={handleDelete} variant="danger">
              Delete
            </Button>
          )}
        </Box>
      </Modal>
    </LocalizationProvider>
  );
};

export default EditLessonModal;
