import React, { useState } from 'react';
import './VoucherModal.css';

const vouchers = [
  { id: 1, name: 'Voucher 1', price: 50000, expirationDate: '10/09/2024', description: 'Description 1' },
  { id: 2, name: 'Voucher 2', price: 10000, expirationDate: '10/09/2024', description: 'Description 2' },
];

const formatPrice = (price) => {
  return price.toLocaleString('vi-VN') + ' đ';
};

const VoucherModal = ({ isOpen, onClose }) => {
  const [selectedVouchers, setSelectedVouchers] = useState({});
  const [checkedVouchers, setCheckedVouchers] = useState({});

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

  const handleSubmit = () => {
    const result = Object.keys(selectedVouchers).reduce((acc, id) => {
      if (checkedVouchers[id] && selectedVouchers[id] > 0) {
        acc[id] = selectedVouchers[id];
      }
      return acc;
    }, {});
    console.log(result);
    onClose();
  };

  return (
    isOpen ? (
      <div className="voucher-modal">
        <div className="voucher-modal-content">
          <span className="voucher-modal-close" onClick={onClose}>&times;</span>
          <h2>Select Vouchers</h2>
          <div className="voucher-list">
            {vouchers.map(voucher => (
              <div key={voucher.id} className="voucher-item">
                <label>
                  <input
                    type="checkbox"
                    checked={checkedVouchers[voucher.id] || false}
                    onChange={(e) => handleCheckboxChange(e, voucher.id)}
                  />
                  <div className="voucher-details">
                    <h3>{voucher.name}</h3>
                    <div>Price: {formatPrice(voucher.price)}</div>
                    <div>Expiration Date: {voucher.expirationDate}</div>
                    <div>Description: {voucher.description}</div>
                    {checkedVouchers[voucher.id] && (
                      <input
                        type="number"
                        placeholder="Number of Vouchers"
                        value={selectedVouchers[voucher.id] || ''}
                        onChange={(e) => handleInputChange(e, voucher.id)}
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
    ) : null
  );
};

export default VoucherModal;
