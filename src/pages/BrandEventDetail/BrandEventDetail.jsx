import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BrandEventDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import VoucherModal from "./VoucherModal";
import axios from "axios";
import moment from "moment"

const formatDate = (dateString) => {
  return moment.parseZone(dateString).format('MMMM D, YYYY h:mm A');
};

function BrandDetail() {
  const { id } = useParams(); // Get the event ID from the URL
  const [currentEvent, setCurrentEvent] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [totalVouchers, setTotalVouchers] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/v1/event/${id}`);
        const data = await response.json();
        setCurrentEvent(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    const fetchVouchers = async () => {
      if (currentEvent) {
        try {
          const response = await fetch(`http://localhost:3002/api/v1/voucher-event/event/${id}`);
          const data = await response.json();
          setVouchers(Array.isArray(data) ? data : []);
          const total = data.reduce((acc, voucher) => acc + (voucher.SOLUONGVOUCHER || 0), 0);
          setTotalVouchers(total);
        } catch (error) {
          console.error("Error fetching vouchers data:", error);
        }
      }
    };

    fetchVouchers();
  }, [currentEvent, id]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddOrUpdateVouchers = async (newVouchers) => {
    try {
      const response = await axios.post("http://localhost:3002/api/v1/voucher-event", newVouchers);
      console.log("Response:", response.data);

      const updatedResponse = await fetch(`http://localhost:3002/api/v1/voucher-event/event/${id}`);
      const updatedData = await updatedResponse.json();
      setVouchers(Array.isArray(updatedData) ? updatedData : []);
      
      const total = updatedData.reduce((acc, voucher) => acc + (voucher.SOLUONGVOUCHER || 0), 0);
      setTotalVouchers(total);

      handleCloseModal();
    } catch (error) {
      console.error("Error adding/updating vouchers:", error);
    }
  };

  const handleEditEvent = () => {
    window.location.href = `/brand/edit/${id}`;
  };

  if (!currentEvent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-detail-container">
      <img src={currentEvent.HINHANH} alt={currentEvent.TENSUKIEN} className="event-detail-image" />
      <div className="event-detail-info">
        <h1 className="event-detail-name">{currentEvent.TENSUKIEN}</h1>
        <p className="event-detail-type">Type: {currentEvent.LOAITROCHOI}</p>
        <p className="event-detail-vouchers">Total Vouchers: {totalVouchers || 'N/A'}</p>
        <p className="event-detail-dates">Start Date: {formatDate(currentEvent.TGBATDAU)}</p>
        <p className="event-detail-dates">End Date: {formatDate(currentEvent.TGKETTHUC)}</p>
        <div className="event-detail-buttons">
          <button className="event-detail-button" onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faEdit} /> Add Voucher
          </button>
          <button className="event-detail-button" onClick={handleEditEvent}>
            <FontAwesomeIcon icon={faEdit} /> Edit Event
          </button>
        </div>
      </div>
      <VoucherModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleAddOrUpdateVouchers} brandId={id} />
    </div>
  );
}

export default BrandDetail;
