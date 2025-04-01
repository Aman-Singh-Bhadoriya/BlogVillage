"use client";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function MyEventCalendar() {
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(2025, 2, 28, 10, 0),
      end: new Date(2025, 2, 28, 11, 30),
    },
    {
      title: "Workshop",
      start: new Date(2025, 2, 29, 14, 0),
      end: new Date(2025, 2, 29, 16, 0),
    },
  ]);

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
