import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

import { useFormik } from "formik";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

import UserContext from "../../util/UserContext";
import EditLessonModal from "./EditLessonModal";

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

const TeacherCalendar = () => {
  const cal = useRef(); // to access the calendar you must use a reference
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Use Effect has triggered!");
    const calendarApi = cal.current.getApi();

    // fetching lessons from backend
    let resStatus;
    fetch(`http://localhost:5000/api/lessons/teacher/${user[1]}`, {
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
          newEvent.borderColor = "#ffffff";
          newEvent.extendedProps = {};
          newEvent.extendedProps.status = lesson.status;

          // checking if lesson is not available
          if (lesson.status == "AVAILABLE") {
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "REQUESTED") {
            console.log("Rendering lesson that has been requested");
            newEvent.backgroundColor = "#A020F0";
            calendarApi.addEvent(newEvent);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // using the Formik hook
  const formik = useFormik({
    initialValues: {
      subject: "",
      place: "",
      price: "",
    },
    onSubmit: (values) => {
      if (editing) {
        const calendarApi = cal.current.getApi();
        const currentEvent = calendarApi.getEventById(selectedEventId);

        const updatedLesson = {
          subject: values.subject,
          price: values.price,
          start: currentEvent.start,
          end: currentEvent.end,
          place: values.place,
          teacherId: user[1],
        };

        let resStatus;
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
        editing = false;

        setOpenEditModal(false);

        // updating place in database
        //todo
      } else {
        const calendarApi = cal.current.getApi();

        const newLesson = {
          subject: values.subject,
          price: values.price,
          start: selectedEvent.start,
          end: selectedEvent.end,
          place: values.place,
          teacherId: user[1],
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
              start: selectedEvent.start,
              end: selectedEvent.end,
              allDay: selectedEvent.allDay,
            };

            calendarApi.addEvent(newEvent);

            // testing
            console.log("Successfully new lesson/event");
            console.log(newEvent);
          })
          .catch((err) => {
            console.log(err);
          });

        setOpenEditModal(false);
        calendarApi.unselect();
      }
    },
  });

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    editing = false;
  };

  const handleCloseAcceptModal = () => {
    setOpenAcceptModal(false);
    editing = false;
  };

  const handleDateSelect = (selected) => {
    // when an event is selected we retrieve all the selection info and open the modal
    selectedEvent.start = selected.start;
    selectedEvent.end = selected.end;
    selectedEvent.allDay = selected.allDay;

    setOpenEditModal(true);
  };

  const handleCancel = (e) => {
    if (editing) {
      e.preventDefault();
      const calendarApi = cal.current.getApi();
      calendarApi.unselect();
      setOpenEditModal(false);
      editing = false;
    } else {
      e.preventDefault();
      setOpenEditModal(false);
    }
  };

  const handleDelete = () => {
    const calendarApi = cal.current.getApi();

    let resStatus;
    fetch(`http://localhost:5000/api/lessons/${selectedEventId}`, {
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
        calendarApi.getEventById(selectedEventId).remove();

        // testing
        console.log("Successfully deleted lesson/event");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    editing = false;
    setOpenEditModal(false);
  };

  const handleEventClick = (selected) => {
    selectedEventId = selected.event.id;
    console.log("Clicked on: " + selectedEventId);

    if (selected.event.extendedProps.status === "REQUESTED") {
      setOpenAcceptModal(true);
      return;
    }

    //set start edit mode
    editing = true;
    setOpenEditModal(true);
  };

  const handleAccept = () => {
    console.log("Accepting lesson");
    setOpenAcceptModal(false);
  };

  const handleDecline = () => {
    console.log("Declining lesson");
    setOpenAcceptModal(false);
  };

  return (
    <Box m="20px">
      <EditLessonModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        onSubmit={formik.handleSubmit}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        subject={formik.values.subject}
        place={formik.values.place}
        price={formik.values.price}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        editing={editing}
      />
      <Modal
        open={openAcceptModal}
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
          <Button onClick={handleAccept}>Accept</Button>
          <Button onClick={handleDecline}>Decline</Button>
        </Box>
      </Modal>
      <Box display="flex" justifyContent="space-between">
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
            selectable={true}
            selectMirror={true}
            selectOverlap={false}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)} // sets events
            initialEvents={[]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherCalendar;
