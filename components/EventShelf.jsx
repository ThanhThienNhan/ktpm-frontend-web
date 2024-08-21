import React from "react";
import EventCard from "./EventCard";
import "./EventShelf.css";

const EventShelf = ({ events, context }) => {
    return (
        <div>
            <div className="event-shelf">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} context={context} />
                ))}
            </div>
        </div>
    );
};

export default EventShelf;
