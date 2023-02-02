import React from "react";
import { useState } from "react";

import FullCalendar, { formatDate } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

let newEvent = {};

const Calendar = () => {
  
  const [currentEvents, setCurrentEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleClose = () => setOpenEditModal(false);

  const handleDateSelect = (selected) => {
    setOpenEditModal(true);

    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    // Dummy data
    const title = "Dummy data";

    newEvent.id = `${selected.dateStr}-${title}`;
    newEvent.title = title;
    newEvent.start = selected.startStr;
    newEvent.end = selected.endStr;
    newEvent.allDay = selected.allDay;

    console.log(newEvent);

    calendarApi.addEvent(newEvent);
  };

  const handleAddClick = () => {
    console.log(newEvent);
  };

  const handleEventClick = (selected) => {
    selected.event.remove();
  };

  return (
    <Box m="20px">
      <Modal
        open={openEditModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Confirm Lesson</Typography>
          <Button onClick={handleAddClick}>Button</Button>
        </Box>
      </Modal>
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
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
            eventsSet={(events) => setCurrentEvents(events)}
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
