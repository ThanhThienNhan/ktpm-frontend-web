import { useParams } from "react-router-dom";
import React, { useState } from "react";
import "./BrandEventDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import VoucherModal from "./VoucherModal";

const event = {
  id: "abcxyz",
  totalVouchers: 500,
  image: "https://via.placeholder.com/280x190",
  name: "Saturday Quiz",
  type: "Realtime Quiz",
  startDate: "18:00 13/08/2023",
  endDate: "20:00 13/08/2023",
};

function BrandDetail() {
  const { id } = useParams();
  const currentEvent = event; // This will be fetched based on the ID
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="event-detail-container">
      <img src={currentEvent.image} alt={currentEvent.name} className="event-detail-image" />
      <div className="event-detail-info">
        <h1 className="event-detail-name">{currentEvent.name}</h1>
        <p className="event-detail-type">Type: {currentEvent.type}</p>
        <p className="event-detail-vouchers">Total Vouchers: {currentEvent.totalVouchers}</p>
        <p className="event-detail-dates">Start Date: {currentEvent.startDate}</p>
        <p className="event-detail-dates">End Date: {currentEvent.endDate}</p>
        <div className="event-detail-buttons">
          <button className="event-detail-button" onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faEdit} /> Add Voucher
          </button>
          <button className="event-detail-button">
            <FontAwesomeIcon icon={faEdit} /> Edit Event
          </button>
        </div>
      </div>
      <VoucherModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default BrandDetail;
