import React, { useState, useEffect } from "react";
import EventShelf from "../../../components/EventShelf";
import BrandPagination from "../../../components/BrandPagination";
import "./BrandReports.css";
import { useBrand } from '../../BrandContext';

const BrandReports = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    const [totalPages, setTotalPages] = useState(1);
    const { brandId } = useBrand();
    
    useEffect(() => {
        // Fetch past events when the component mounts
        if (brandId) {
            fetch(`http://localhost/brand/api/v1/event/past/${brandId}`)
                .then(response => response.json())
                .then(data => {
                    setEvents(data);
                    setTotalPages(Math.ceil(data.length / eventsPerPage));
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                });
        }
    }, [brandId]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * eventsPerPage;
    const selectedEvents = events.slice(startIndex, startIndex + eventsPerPage);

    return (
        <div>
            <h2>Reports</h2>

            {events.length > 0 ? (
                <>
                    <EventShelf events={selectedEvents} />

                    <div className="brand-reports-pagination-container">
                        <BrandPagination
                            className="brand-reports-pagination"
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            ) : (
                <p className="brand-reports-no-reports-message">There are no reports yet</p>
            )}
        </div>
    );
};

export default BrandReports;
