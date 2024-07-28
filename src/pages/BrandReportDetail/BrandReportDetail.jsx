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
  { username: "user1", playTime: 30 },
  { username: "user2", playTime: 60 },
  { username: "user3", playTime: 45 },
  { username: "user4", playTime: 150 },
  { username: "user5", playTime: 90 },
  { username: "user6", playTime: 35 },
  { username: "user7", playTime: 20 },
  { username: "user8", playTime: 120 },
  { username: "user9", playTime: 10 },
  { username: "user10", playTime: 240 },
];

function formatPlayTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h${mins < 10 ? '0' : ''}${mins}m`;
}

function BrandReportDetail() {
  const { id } = useParams();
  const currentReport = report; // This will be fetched  based on the ID

  const sortedData = [...fakeData].sort((a, b) => b.playTime - a.playTime);

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
              <th>Play Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((data, index) => (
              <tr key={index}>
                <td>{data.username}</td>
                <td>{formatPlayTime(data.playTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandReportDetail;
