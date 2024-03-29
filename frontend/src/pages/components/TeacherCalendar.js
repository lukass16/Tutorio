import React from "react";
import { useState, useRef, useEffect, useContext } from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";

import UserContext from "../../util/UserContext";
import EditLessonModal from "./EditLessonModal";
import AcceptLessonModal from "../../shared/modals/AcceptLessonModal";
import { colors } from "../../util/theme";

let selectedEvent = {};
let selectedEventId;
let editing;

const TeacherCalendar = () => {
  const cal = useRef(); // to access the calendar you must use a reference

  const [currentEvents, setCurrentEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAcceptModal, setOpenAcceptModal] = useState(false);

  const { user } = useContext(UserContext);

  const setEditing = (value) => (editing = value);

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
          newEvent.extendedProps.price = lesson.price;
          newEvent.extendedProps.place = lesson.place;

          // checking if lesson is not available
          if (lesson.status == "AVAILABLE") {
            newEvent.backgroundColor = colors["AVAILABLE"];
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "REQUESTED") {
            console.log("Rendering lesson that has been requested");
            newEvent.backgroundColor = colors["REQUESTED"];
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "ACCEPTED") {
            console.log("Rendering lesson that has been accepted");
            newEvent.backgroundColor = colors["ACCEPTED"];
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "PENDING") {
            console.log("Rendering lesson that's pending");
            newEvent.backgroundColor = colors["PENDING"];
            calendarApi.addEvent(newEvent);
          } else if (lesson.status == "FINISHED") {
            console.log("Rendering lesson that's finished");
            newEvent.backgroundColor = colors["FINISHED"];
            calendarApi.addEvent(newEvent);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDateSelect = (selected) => {
    // when an event is selected we retrieve all the selection info and open the modal
    selectedEvent = selected;

    setOpenEditModal(true);
  };

  const handleEventClick = (selected) => {
    selectedEventId = selected.event.id;
    selectedEvent = selected.event;

    console.log(selected.event.extendedProps.status);

    if (selected.event.extendedProps.status === "REQUESTED") {
      setOpenAcceptModal(true);
      return;
    } else if (selected.event.extendedProps.status === "ACCEPTED") {
      setOpenAcceptModal(true);
      return;
    } else {
      setEditing(true);
      setOpenEditModal(true);
    }
  };

  return (
    <Box m="20px">
      {openEditModal && (<EditLessonModal
        open={openEditModal}
        editing={editing}
        setEditing={setEditing}
        setOpenEditModal={setOpenEditModal}
        selectedEventId={selectedEventId}
        selectedEvent={selectedEvent}
        user={user}
        cal={cal}
      />)}
      
      <AcceptLessonModal
        open={openAcceptModal}
        setOpenAcceptModal={setOpenAcceptModal}
        selectedEventId={selectedEventId}
        cal={cal}
      />

      <Box display="flex" justifyContent="space-between">
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            ref={cal}
            height="85vh"
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
