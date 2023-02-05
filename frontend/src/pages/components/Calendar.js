import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

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

const selectedEvent = {};
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

  const handleClose = () => {
    setOpenEditModal(false);
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
            editable={false} // whether the events can be dragged and resized, can later implement this to true
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
