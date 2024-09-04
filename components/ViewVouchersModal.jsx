import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewVouchersModal.css';

const ViewVouchersModal = ({ isOpen, onClose, eventId }) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && eventId) {
      const fetchVouchers = async () => {
        try {
          console.log("Event ID:", eventId);
          const response = await axios.get(`http://localhost:2999/brand/api/v1/voucher-event/event/${eventId}`);
          setVouchers(Array.isArray(response.data) ? response.data : []);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching vouchers by event ID:', err);
          setError('Failed to fetch vouchers.');
          setLoading(false);
        }
      };
      fetchVouchers();
    } else {
      setVouchers([]);
    }
  }, [isOpen, eventId]);

  if (!isOpen) return null;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="view-vouchers-modal">
      <div className="view-vouchers-modal-content">
        <span className="view-vouchers-modal-close" onClick={onClose}>&times;</span>
        <h2>Vouchers for this Event</h2>
        <div className="voucher-list">
          {vouchers.map(voucher => (
            <div key={voucher.ID_VOUCHER} className="voucher-item">
              <div><strong>Value:</strong> {voucher.TRIGIA} VND</div>
              <div><strong>Quantity:</strong> {voucher.SOLUONGVOUCHER}</div>
              <div><strong>Used:</strong> {voucher.SOLUOTSUDUNG}</div>
              <div><strong>Description:</strong> {voucher.MOTA}</div>
            </div>
          ))}
        </div>
        <button className="view-vouchers-modal-close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewVouchersModal;
