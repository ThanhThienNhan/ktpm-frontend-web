import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventShelf from "../../../components/EventShelf";

const events = [
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Realtime Quiz",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
    {
        image: "https://via.placeholder.com/280x190",
        name: "Sunday Quiz",
        type: "Shake Phone",
        startDate: "19:00 14/08/2024",
        endDate: "21:00 14/08/2024",
    },
];

const BrandSearchEvents = () => {
    const { word } = useParams();

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(word.toLowerCase()) ||
        event.type.toLowerCase().includes(word.toLowerCase())
    );

    return (
        <div>
            <h2>Search Results for "{word}"</h2>

            <EventShelf
                events={filteredEvents}
            />

        </div>
    );
};

export default BrandSearchEvents;
