import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBrand } from '../../BrandContext';
import EventShelf from '../../../components/EventShelf';
import BrandPagination from '../../../components/BrandPagination';
import './BrandEvents.css';

const BrandEvents = () => {
    const navigate = useNavigate();
    const { brandId } = useBrand();
    console.log("BRANDID",brandId)
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (brandId) {
            fetch(`http://localhost:2999/brand/api/v1/event/coming/${brandId}`)
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

    const handleCreateEventClick = () => {
        navigate('/brand/create-event');
    };

    const handleCreateVoucherClick = () => {
        navigate('/brand/create-voucher');
    };

    return (
        <div>
            <h2>New Events</h2>

            <div className="brand-events-create-button-container">
                <button
                    className="brand-events-create-button"
                    onClick={handleCreateVoucherClick}>
                    Create a Voucher
                </button>

                <button
                    className="brand-events-create-button"
                    onClick={handleCreateEventClick}>
                    Create an Event
                </button>
            </div>

            <EventShelf events={selectedEvents} />

            <div className="brand-events-pagination-container">
                <BrandPagination
                    className="brand-events-pagination"
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default BrandEvents;
