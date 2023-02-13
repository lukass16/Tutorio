import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";

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
let editing;

// https://fullcalendar.io/docs/events-json-feed
// could potentially use multiple event sources that filter out only active lessons etc and apply custom options to them

const TeacherCalendar = () => {
  const cal = useRef(); // to access the calendar you must use a reference
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const { user } = useContext(UserContext);

  const setEditing = (value) => editing = value;


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

  const handleCloseAcceptModal = () => {
    setOpenAcceptModal(false);
    setEditing(false);
  };

  const handleDateSelect = (selected) => {
    // when an event is selected we retrieve all the selection info and open the modal
    selectedEvent.start = selected.start;
    selectedEvent.end = selected.end;
    selectedEvent.allDay = selected.allDay;

    setOpenEditModal(true);
  };

  const handleEventClick = (selected) => {
    selectedEventId = selected.event.id;
    console.log("Clicked on: " + selectedEventId);

    if (selected.event.extendedProps.status === "REQUESTED") {
      setOpenAcceptModal(true);
      return;
    }

    //set start edit mode
    setEditing(true);
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
        editing={editing}
        setEditing={setEditing}
        setOpenEditModal = {setOpenEditModal}
        selectedEventId={selectedEventId}
        selectedEvent={selectedEvent}
        user={user}
        cal = {cal}
      />
      {/* <Modal
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
    </Modal>*/}
     
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
