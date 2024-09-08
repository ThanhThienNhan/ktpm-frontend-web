import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import "../../index.css"

import UserTableView from '../../../components/UserTableView';
import PaginationBar from '../../../components/PaginationBar';
import ErrorMessageBox from '../../../components/ErrorMessageBox';

function AdminUserManagement() {
  let navigate = useNavigate();

  const totalPages = 10;

  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost/user/v1/api/auth/users/`).then((response) => {
      setUsers(response.data);
    }).catch((error) => {
      console.error("There was an error loading users!", error);
      setError("There was an error loading users! Check your connection.");
    });
  },[]);

  React.useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function deleteUser(username){
    setUsers((oldUsers) => oldUsers.filter((user) => user.ID_TTNGUOIDUNG !== username));

    axios.delete(`http://localhost/user/v1/api/auth/users/${username}`, {
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
      setError("There was an error deleting the user! Please try again.");
    });
    
  }

  function editUser(username){
    navigate(`/admin/user-management/edit/${username}`);
  }

  function changePage(number){
    //do sth
    console.log("Page " + number);
  }

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <>
      {error && <ErrorMessageBox message={error} onClose={handleCloseError} />}
      <div>
        <div style={{height: "50px"}}>
          <button className='Button'onClick={() => navigate("/admin/user-management/new")} >Add new user</button>
        </div>
        <UserTableView data={users} onDelete={deleteUser} onEdit={editUser}/>
        <PaginationBar totalPages={totalPages} onPageChange={changePage}/>
      </div>
    </>
  )
}

export default AdminUserManagement