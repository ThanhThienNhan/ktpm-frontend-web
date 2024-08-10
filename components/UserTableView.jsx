import React from 'react';

import "./UserTableView.css";

export default function UserTableView(props){
    const {data,onDelete, onEdit} = props;

    return(
      <div className='table-container'>
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{user.TENDANGNHAP}</td>
                <td>{user.EMAIL}</td>
                <td>{user.SDT}</td>
                <td>{user.GIOITINH === 0 ? "Male" : "Female"}</td>
                <td>{user.VAITRO}</td>
                <td>{user.TRANGTHAI}</td>
                <td className='Button--container'>
                  <button className='Button' onClick={() => onEdit(user.ID_TTNGUOIDUNG)}>Edit</button>
                  <button className='Button' onClick={() => onDelete(user.ID_TTNGUOIDUNG)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}