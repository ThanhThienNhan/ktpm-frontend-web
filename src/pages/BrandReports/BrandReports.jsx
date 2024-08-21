import React, { useState, useEffect } from "react";
import EventShelf from "../../../components/EventShelf";
import BrandPagination from "../../../components/BrandPagination";
import "./BrandReports.css";

const BrandReports = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    const [totalPages, setTotalPages] = useState(1);
    const brandId = 1;  // Temporary idThuongHieu set to 1

    useEffect(() => {
        // Fetch events when the component mounts
        fetch(`http://localhost:3002/api/v1/event/past/${brandId}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data);  // Debugging: log fetched data
                setEvents(data);
                setTotalPages(Math.ceil(data.length / eventsPerPage));
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, [brandId]);  // Add brandId as a dependency to re-fetch if it changes

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * eventsPerPage;
    const selectedEvents = events.slice(startIndex, startIndex + eventsPerPage);

    return (
        <div>
            <h2>Reports</h2>

            <EventShelf
                events={selectedEvents}
                context="reports"
            />

            <div className="brand-reports-pagination-container">
                <BrandPagination
                    className="brand-reports-pagination"
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default BrandReports;
