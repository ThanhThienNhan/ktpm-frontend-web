import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventShelf from "../../../components/EventShelf";
import BrandPagination from "../../../components/BrandPagination";
import "./BrandEvents.css"


const events = [
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2024",
        TGKETTHUC: "20:00 13/08/2024",
    }
];


const BrandEvents = () => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * eventsPerPage;
    const selectedEvents = events.slice(startIndex, startIndex + eventsPerPage);


    const handleCreateEventClick = () => {
        navigate('/create-event');
    };

    const handleCreateVoucherClick = () => {
        navigate('/create-voucher');

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

            <EventShelf
                events={selectedEvents}
                currentPage={currentPage}
                eventsPerPage={eventsPerPage}
                onPageChange={handlePageChange}
            />

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
