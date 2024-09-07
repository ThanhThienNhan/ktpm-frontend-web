import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BrandReportDetail.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ViewVouchersModal from "../../../components/ViewVouchersModal";

const formatDate = (dateString) => {
  return moment.parseZone(dateString).format('DD/MM/YYYY HH:mm');
};

function BrandReportDetail() {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [voucherData, setVoucherData] = useState([]);
  const [totalVouchers, setTotalVouchers] = useState(0);
  const [vouchersUsed, setVouchersUsed] = useState(0);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(`http://localhost:2999/brand/api/v1/event/${id}`);
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    const fetchVoucherData = async () => {
      try {
        const response = await fetch(`http://localhost:2999/brand/api/v1/voucher-event/event/${id}`);
        const data = await response.json();
        setVoucherData(data);

        const total = data.reduce((acc, voucher) => acc + voucher.SOLUONGVOUCHER, 0);
        setTotalVouchers(total);
        const used = data.reduce((acc, voucher) => acc + voucher.SOLUOTSUDUNG, 0);
        setVouchersUsed(used);
      } catch (error) {
        console.error("Error fetching voucher data:", error);
      }
    };

    fetchReportData();
    fetchVoucherData();
  }, [id]);

  const handleOpenViewModal = () => setIsViewModalOpen(true);
  const handleCloseViewModal = () => setIsViewModalOpen(false);

  if (!reportData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="report-detail-container">
      <img src={reportData.HINHANH} alt={reportData.TENSUKIEN} className="report-detail-image" />
      <div className="report-detail-info">
        <h1 className="report-detail-name">{reportData.TENSUKIEN}</h1>
        <p className="report-detail-type">Type: {reportData.LOAITROCHOI}</p>
        <p className="report-detail-dates">
          Start Date: {formatDate(reportData.TGBATDAU)}
        </p>
        <p className="report-detail-dates">
          End Date:  {formatDate(reportData.TGKETTHUC)}
        </p>
        <p className="report-detail-players">Players Joined: {reportData.playersJoined || 'N/A'}</p>
        <p className="report-detail-vouchers">
          Vouchers Used: {vouchersUsed}/{totalVouchers}
        </p>
        <button className="report-detail-button" onClick={handleOpenViewModal}>
          <FontAwesomeIcon icon={faEye} /> View Vouchers
        </button>
      </div>
      <div className="report-detail-table-container">
        <table className="report-detail-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {[
              { "username": "JackAnderson", "points": 240 },
              { "username": "DavidBrown", "points": 150 },
              { "username": "HannahMoore", "points": 120 },
              { "username": "EveDavis", "points": 90 },
              { "username": "BobSmith", "points": 60 },
              { "username": "CarolJohnson", "points": 45 },
              { "username": "FrankMiller", "points": 35 },
              { "username": "AliceGreen", "points": 30 },
              { "username": "GraceWilson", "points": 20 },
              { "username": "IanTaylor", "points": 10 }
            ].map((data, index) => (
              <tr key={index}>
                <td>{data.username}</td>
                <td>{data.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewVouchersModal isOpen={isViewModalOpen} onClose={handleCloseViewModal} eventId={id} />
    </div>
  );
}

export default BrandReportDetail;
