import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div
        className="event-card-thumbnail"
        style={{ backgroundImage: `url(${event.image})` }}
      ></div>
      <div className="event-card-desc">
        <h3 className="event-card-name">{event.name}</h3>
        <div className="event-card-type">Type: {event.type}</div>
      </div>
      <div className="event-card-dates">
        <div>Start: {event.startDate}</div>
        <div>End: {event.endDate}</div>
      </div>
    </div>
  );
};

export default EventCard;
