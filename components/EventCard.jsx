import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div
        className="event-card-thumbnail"
        style={{ backgroundImage: `url(${event.HINHANH})` }}
      ></div>
      <div className="event-card-desc">
        <h3 className="event-card-name">{event.TENSUKIEN}</h3>
        <div className="event-card-type">Type: {event.LOAITROCHOI}</div>
      </div>
      <div className="event-card-dates">
        <div>Start: {event.TGBATDAU}</div>
        <div>End: {event.TGKETTHUC}</div>
      </div>
    </div>
  );
};

export default EventCard;
