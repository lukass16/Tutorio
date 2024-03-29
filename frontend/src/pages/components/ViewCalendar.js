import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";

import UserContext from "../../util/UserContext";
import RegisterLessonModal from "./RegisterLessonModal";
import { colors } from "../../util/theme";

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

let selectedEventId;
let editing = false;

const ViewCalendar = () => {
  const { teacherId } = useParams();

  const cal = useRef(); // to access the calendar you must use a reference
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const { user } = useContext(UserContext);

  const setEditing = (value) => (editing = value);

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
          newEvent.borderColor = "#ffffff";
          newEvent.extendedProps = {};
          newEvent.extendedProps.hasRegistered = "false";

          // checking if lesson is not available
          if (lesson.status == "REQUESTED") {
            if (lesson.studentId == user[1]) {
              console.log("Rendering lesson that is registered for this user");
              newEvent.backgroundColor = colors["REQUESTED"];
              newEvent.extendedProps.hasRegistered = "true"; // indicating that this student has registered for this lesson
              calendarApi.addEvent(newEvent);
            }
          } else if (lesson.status == "ACCEPTED") {
            newEvent.backgroundColor =  colors["ACCEPTED"];
            newEvent.extendedProps.hasRegistered = "true";
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "PENDING") {
            newEvent.backgroundColor = colors["PENDING"];
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "FINISHED") {
            newEvent.backgroundColor = colors["FINISHED"];
            calendarApi.addEvent(newEvent);
          } else {
            newEvent.backgroundColor = colors["AVAILABLE"];
            calendarApi.addEvent(newEvent);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEventClick = (selected) => {
    selectedEventId = selected.event.id;
    console.log("Clicked on: " + selectedEventId);

    if (selected.event.extendedProps.hasRegistered == "true") {
      editing = true;
      console.log("This student has registered for this lesson");
    }

    setOpenRegisterModal(true);
  };

  return (
    <Box m="20px">
      <RegisterLessonModal
        open={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
        selectedEventId={selectedEventId}
        editing={editing}
        setEditing={setEditing}
        cal={cal}
        user={user}
      />
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
