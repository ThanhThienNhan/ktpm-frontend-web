import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VoucherModal.css';
import { toast } from 'react-toastify';

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + ' đ';
};

const VoucherModal = ({ isOpen, onClose, onSave, brandId }) => {
  const [vouchers, setVouchers] = useState([]);
  const [selectedVouchers, setSelectedVouchers] = useState({});
  const [checkedVouchers, setCheckedVouchers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && brandId) {
      const fetchVouchers = async () => {
        try {
          const response = await axios.get(`http://localhost:3002/api/v1/voucher/${brandId}`);
          setVouchers(Array.isArray(response.data) ? response.data : []);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching vouchers:', err);
          setError('Failed to fetch vouchers.');
          setLoading(false);
        }
      };
      fetchVouchers();
    } else {
      setVouchers([]);
    }
  }, [isOpen, brandId]);

  const handleCheckboxChange = (e, id) => {
    const { checked } = e.target;
    setCheckedVouchers(prevState => ({
      ...prevState,
      [id]: checked,
    }));

    if (!checked) {
      setSelectedVouchers(prevState => ({
        ...prevState,
        [id]: ''
      }));
    }
  };

  const handleInputChange = (e, id) => {
    setSelectedVouchers({
      ...selectedVouchers,
      [id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const result = Object.keys(selectedVouchers).map(id => ({
      ID_VOUCHER: parseInt(id),
      ID_SUKIEN: brandId, // Event ID
      SOLUONGVOUCHER: parseInt(selectedVouchers[id])
    }));

    if (result.length > 0) {
      try {
        await onSave(result);
        toast.success('Vouchers updated successfully!'); 
      } catch (err) {
        toast.error('Failed to update vouchers.');
      }
    }

    onClose();
  };

  if (!isOpen) return null;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="voucher-modal">
      <div className="voucher-modal-content">
        <span className="voucher-modal-close" onClick={onClose}>&times;</span>
        <h2>Select Vouchers</h2>
        <div className="voucher-list">
          {Array.isArray(vouchers) && vouchers.map(voucher => (
            <div key={voucher.ID_VOUCHER} className="voucher-item">
              <label>
                <input
                  type="checkbox"
                  checked={checkedVouchers[voucher.ID_VOUCHER] || false}
                  onChange={(e) => handleCheckboxChange(e, voucher.ID_VOUCHER)}
                />
                <div className="voucher-details">
                  <img src={voucher.HINHANH} alt={voucher.MOTA} className="voucher-image" />
                  <h3>{voucher.MOTA}</h3>
                  <div>Price: {formatPrice(voucher.TRIGIA)}</div>
                  <div>Expiration Date: {new Date(voucher.NGAYHETHAN).toLocaleDateString()}</div>
                  {checkedVouchers[voucher.ID_VOUCHER] && (
                    <input
                      type="number"
                      placeholder="Number of Vouchers"
                      value={selectedVouchers[voucher.ID_VOUCHER] || ''}
                      onChange={(e) => handleInputChange(e, voucher.ID_VOUCHER)}
                    />
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
        <button className="voucher-modal-submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default VoucherModal;
