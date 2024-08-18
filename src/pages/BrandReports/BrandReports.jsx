import React, { useState } from "react";
import EventShelf from "../../../components/EventShelf";
import BrandPagination from "../../../components/BrandPagination";
import "./BrandReports.css"


const events = [
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    },
    {
        HINHANH: "https://via.placeholder.com/280x190",
        TENSUKIEN: "Saturday Quiz",
        LOAITROCHOI: "Realtime Quiz",
        TGBATDAU: "18:00 13/08/2023",
        TGKETTHUC: "20:00 13/08/2023",
    }
];

const BrandReports = () => {
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
            <h2>Reports</h2>
            <EventShelf 
                events={selectedEvents} 
                currentPage={currentPage} 
                eventsPerPage={eventsPerPage}
                onPageChange={handlePageChange}
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
