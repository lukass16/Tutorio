import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

import { useFormik } from "formik";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button, Typography, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

import UserContext from "../../util/UserContext";

const style = {
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

const DUMMY_LESSONS = [
  {
    id: 1,
    subject: "Physics",
    comment_from_st: "",
    start: Date.now(),
    end: Date.now() + 3.6e6 * 2,
    place: "Somewhere",
  },
  {
    id: 2,
    subject: "Math",
    comment_from_st: "",
    start: Date.now() - 8.64e7,
    end: Date.now() - 8.64e7 + 3.6e6,
    place: "Somewhere",
  },
];

let selectedEventId;
let editing = false;

// https://fullcalendar.io/docs/events-json-feed
// could potentially use multiple event sources that filter out only active lessons etc and apply custom options to them
// todo: add custom color rendering

const Calendar = () => {
  const cal = useRef(); // to access the calendar you must use a reference
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log("Use Effect has triggered!");
    const calendarApi = cal.current.getApi();
    DUMMY_LESSONS.map((lesson) => {
      let newEvent = {};
      newEvent.id = `${lesson.id}`;
      newEvent.title = lesson.subject;
      newEvent.start = lesson.start;
      newEvent.end = lesson.start;
      newEvent.allDay = false;

      calendarApi.addEvent(newEvent);
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
          teacherId: user[0],
        };

        currentEvent.setProp("title", values.subject);

        console.log("Successfully updated lesson");
        console.log(updatedLesson);

        //set end edit mode
        editing = false;

        setOpenEditModal(false);
      } else {
        const calendarApi = cal.current.getApi();
        const currentEvent = calendarApi.getEventById(selectedEventId);
        currentEvent.setProp("title", values.subject);

        const newLesson = {
          subject: values.subject,
          price: values.price,
          start: currentEvent.start,
          end: currentEvent.end,
          place: values.place,
          teacherId: user[1],
        };

        console.log("Successfully created lesson");
        console.log(newLesson);

        setOpenEditModal(false);

        // add lesson to database
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
            // if response failed
            if (res.status === 500) {
              res.json().then((data) => {
                throw new Error(data.message);
              });
            }
            return res.json();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const handleClose = () => setOpenEditModal(false);

  const handleDateSelect = (selected) => {
    setOpenEditModal(true);

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    const selectedEvent = {};

    selectedEvent.id = `${selected.startStr}`;
    selectedEventId = selectedEvent.id; // setting current selected event id
    selectedEvent.title = "";
    selectedEvent.start = selected.startStr;
    selectedEvent.end = selected.endStr;
    selectedEvent.allDay = selected.allDay;

    calendarApi.addEvent(selectedEvent);
  };

  const handleCancel = (e) => {
    if (editing) {
      const calendarApi = cal.current.getApi();
      calendarApi.unselect();
      setOpenEditModal(false);
    } else {
      e.preventDefault();
      setOpenEditModal(false);
      const calendarApi = cal.current.getApi();
      calendarApi.getEventById(selectedEventId).remove();
    }
  };

  const handleDelete = () => {
    const calendarApi = cal.current.getApi();
    calendarApi.getEventById(selectedEventId).remove();

    setOpenEditModal(false);
  };

  const handleEventClick = (selected) => {
    selectedEventId = selected.event.id;

    //set start edit mode
    editing = true;
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
          sx={style}
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
          <Button type="submit">{editing ? "Update" : "Submit"}</Button>
          <Button onClick={handleCancel}>Cancel</Button>
          {editing && (
            <Button onClick={handleDelete} variant="danger">
              Delete
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
            editable={true}
            selectable={true}
            selectMirror={true}
            selectOverlap={false}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)} // sets events
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
