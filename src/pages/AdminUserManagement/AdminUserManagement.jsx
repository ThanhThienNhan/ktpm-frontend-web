import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import "../../index.css"

import UserTableView from '../../../components/UserTableView';
import PaginationBar from '../../../components/PaginationBar';

function AdminUserManagement() {
  let navigate = useNavigate();

  const usersData = [
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
    { name: 'John Doe', username: 'johndoe', email: 'johndoe@gmail.com', phone: '0123456789', role: 'Player', status: 'Active' },
    { name: 'Jane Smith', username: 'janesmith', email: 'janesmith@gmail.com', phone: '0123456789', role: 'Brand', status: 'Banned' },
  ];

  const totalPages = 10;

  const [users, setUsers] = React.useState(usersData);

  React.useEffect(() => {
    axios.get(`http://localhost:3001/v1/api/auth/users/`).then((response) => {
      setUsers(response.data);
    })
  },[])

  function deleteUser(username){
    setUsers((oldUsers) => oldUsers.filter((user) => user.ID_TTNGUOIDUNG !== username));

    axios.delete(`http://localhost:3001/v1/api/auth/users/${username}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("User deleted successfully!", response.data);
      setUsers((oldUsers) => oldUsers.filter((user) => user.username !== username));
    })
    .catch((error) => {
      console.error("There was an error deleting the user!", error);
    });
    
  }

  function editUser(username){
    navigate(`/admin/user-management/edit/${username}`);
  }

  function changePage(number){
    //do sth
    console.log("Page " + number);
  }

  return (
    <div>
      <div style={{height: "50px"}}>
        <button className='Button'onClick={() => navigate("/admin/user-management/new")} >Add new user</button>
      </div>
      <UserTableView data={users} onDelete={deleteUser} onEdit={editUser}/>
      <PaginationBar totalPages={totalPages} onPageChange={changePage}/>
    </div>
  )
}

export default AdminUserManagement