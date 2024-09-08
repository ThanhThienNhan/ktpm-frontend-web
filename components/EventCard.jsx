import React from "react";
import moment from 'moment';
import "./EventCard.css";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
  return moment.parseZone(dateString).format('DD/MM/YYYY HH:mm');
};

const EventCard = ({ event, context }) => {
  const navigate = useNavigate();
  const now = moment(); // Current date and time
  const startDate = moment.parseZone(event.TGBATDAU);
  const endDate = moment.parseZone(event.TGKETTHUC);

  const isHappening = now.isAfter(startDate) && now.isBefore(endDate);

  const handleCardClick = () => {
    if (endDate.isAfter(now)) {
      navigate(`/brand/event/${event.ID_SUKIEN}`); 
    } else {
      navigate(`/brand/report/${event.ID_SUKIEN}`);
    }
  };

  return (
    <div className="event-card" onClick={handleCardClick}>
      <div
        className="event-card-thumbnail"
        style={{ backgroundImage: `url(${event.HINHANH})` }}
      ></div>
      <div className="event-card-desc">
        <h3 className="event-card-name">{event.TENSUKIEN}</h3>
        <div className="event-card-type">Type: {event.LOAITROCHOI}</div>
      </div>
      {isHappening && <div className="happening-badge">Happening</div>}
      <div className="event-card-dates">
        <div>Start: {formatDate(event.TGBATDAU)}</div>
        <div>End: {formatDate(event.TGKETTHUC)}</div>
      </div>
    </div>
  );
};

export default EventCard;
