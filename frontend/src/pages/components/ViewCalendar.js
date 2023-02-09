import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

import UserContext from "../../util/UserContext";

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

const selectedEvent = {};
let selectedEventId;
let editing = false;

// https://fullcalendar.io/docs/events-json-feed
// could potentially use multiple event sources that filter out only active lessons etc and apply custom options to them
// todo: add custom color rendering

const ViewCalendar = () => {
  const { teacherId } = useParams();

  const cal = useRef(); // to access the calendar you must use a reference
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(teacherId);
    console.log("Use Effect has triggered!");
    const calendarApi = cal.current.getApi();

    // fetching lessons from backend
    let resStatus;
    fetch(`http://localhost:5000/api/lessons/teacher/${teacherId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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

        // render all lessons to calendar
        data.lessons.map((lesson) => {
          let newEvent = {};
          newEvent.id = `${lesson._id}`;
          newEvent.title = lesson.subject;
          newEvent.start = lesson.start;
          newEvent.end = lesson.end;
          newEvent.allDay = false;
          newEvent.backgroundColor = "rgb(255,0,0)";
          newEvent.borderColor = "#ff0000";
          newEvent.extendedProps = {};
          // testing
          if (lesson.subject != "Math") {
            newEvent.extendedProps.hasRegistered = true;
          }
          calendarApi.addEvent(newEvent);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // using the Formik hook
  const formik = useFormik({
    initialValues: {
      comment_from_st: "",
    },
    onSubmit: (values) => {
      const calendarApi = cal.current.getApi();
      const currentEvent = calendarApi.getEventById(selectedEventId);
      const updatedLesson = {
        comment_from_st: values.comment_from_st,
      };

      if (editing) {
        console.log("Updated lesson");
        setOpenEditModal(false);
      } else {
        let resStatus;
        // setting lesson status as requested
        updatedLesson.status = "REQUESTED";

        // sending changes to database
        fetch(`http://localhost:5000/api/lessons/${selectedEventId}`, {
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
          })
          .catch((err) => {
            console.log(err);
          });

       
        setOpenEditModal(false);
      }
    },
  });

  const handleClose = () => {
    editing = false;
    setOpenEditModal(false);
  };

  const handleCancel = (e) => {
    editing = false;
    e.preventDefault();
    setOpenEditModal(false);
  };

  const handleUnregister = () => {
    const calendarApi = cal.current.getApi();

    // let resStatus;
    // fetch(`http://localhost:5000/api/lessons/${selectedEventId}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => {
    //     resStatus = res.status;
    //     return res.json();
    //   })
    //   .then((data) => {
    //     // if response failed
    //     if (resStatus === 500) {
    //       throw new Error(data.message);
    //       return;
    //     }

    //     // change what needs to be changed on the client side
    //     calendarApi.getEventById(selectedEventId).remove();

    //     // testing
    //     console.log("Successfully deleted lesson/event");
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // editing = false;
    // setOpenEditModal(false);
  };

  const handleEventClick = (selected) => {
    selectedEventId = selected.event.id;
    console.log("Clicked on: " + selectedEventId);

    // check if the student has already registered for this lesson
    if (selected.event.extendedProps.hasRegistered) {
      // if so, set editing mode
      editing = true;
      console.log("This student has registered for this lesson");
    }

    setOpenEditModal(true);
  };

  return (
    <Box m="20px">
      <Modal
        open={openEditModal}
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
          <Typography variant="h6">Confirm Lesson</Typography>
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
          <Button type="submit">{editing ? "Update" : "Register"}</Button>
          <Button onClick={handleCancel}>Cancel</Button>
          {editing && (
            <Button onClick={handleUnregister} variant="danger">
              Unregister
            </Button>
          )}
        </Box>
      </Modal>
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            ref={cal}
            height="75vh"
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={false} // whether the events can be dragged and resized, can later implement this to true
            selectable={false}
            selectMirror={true}
            selectOverlap={false}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)} // sets events
            initialEvents={[]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ViewCalendar;
