import React, { useState } from "react";
import EventShelf from "../../../components/EventShelf";
import BrandPagination from "../../../components/BrandPagination";


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
        name: "Saturday Quiz",
        type: "Realtime Quiz",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Realtime Quiz",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Realtime Quiz",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Shake Phone",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    }, {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Shake Phone",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    }, {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Shake Phone",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    }, {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Shake Phone",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Shake Phone",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
    {
        image: "https://via.placeholder.com/280x190",
        name: "Saturday Quiz",
        type: "Shake Phone",
        startDate: "18:00 13/08/2024",
        endDate: "20:00 13/08/2024",
    },
];

const BrandEvents = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * eventsPerPage;
    const selectedEvents = events.slice(startIndex, startIndex + eventsPerPage);

    return (
        <div>
            <h2>Events</h2>
            <EventShelf 
                events={selectedEvents} 
                currentPage={currentPage} 
                eventsPerPage={eventsPerPage}
                onPageChange={handlePageChange}
            />
            <BrandPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BrandEvents;
