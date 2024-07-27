import React from "react";
import EventCard from "./EventCard";
import "./EventShelf.css";

const EventShelf = ({ events, currentPage, eventsPerPage, onPageChange }) => {
    return (
        <div>
            <div className="event-shelf">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventShelf;
