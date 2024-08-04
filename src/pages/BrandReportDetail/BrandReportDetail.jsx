import { useParams } from "react-router-dom";
import React from "react";
import "./BrandReportDetail.css";

const report = {
  id: "abcxyz",
  eventName: "Saturday Quiz",
  totalVouchers: 500,
  playersJoined: 500,
  vouchersUsed: 234,
  image: "https://via.placeholder.com/280x190",
};

const fakeData = [
  { username: "user1", points: 30 },
  { username: "user2", points: 60 },
  { username: "user3", points: 45 },
  { username: "user4", points: 150 },
  { username: "user5", points: 90 },
  { username: "user6", points: 35 },
  { username: "user7", points: 20 },
  { username: "user8", points: 120 },
  { username: "user9", points: 10 },
  { username: "user10", points: 240 },
];


function BrandReportDetail() {
  const { id } = useParams();
  const currentReport = report; // This will be fetched  based on the ID

  return (
    <div className="report-detail-container">
      <img src={currentReport.image} alt={currentReport.eventName} className="report-detail-image" />
      <div className="report-detail-info">
        <h1 className="report-detail-name">{currentReport.eventName}</h1>
        <p className="report-detail-players">Players Joined: {currentReport.playersJoined}</p>
        <p className="report-detail-vouchers">
          Vouchers Used: {currentReport.vouchersUsed}/{currentReport.totalVouchers}
        </p>
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
            {fakeData.map((data, index) => (
              <tr key={index}>
                <td>{data.username}</td>
                <td>{data.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandReportDetail;
