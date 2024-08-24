import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader/AdminHeader";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminLayout = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    try{
      if(!userData){
        console.log("Unauthorized!");
        navigate("/");
      }
      if(userData.VAITRO !== "Admin"){
        console.log("Access Denied!", userData);
        navigate("/");
      }
    }catch(error){
      console.log(error);
      navigate("/");
    }

  }, [userData]);

  const bodyStyle = {
    display: "flex",
  };
  const contentStyle = {
    width: "75%",
    padding: "20px",
    backgroundColor: "white",
  };
  return (
    <>
      <AdminHeader />
      <div style={bodyStyle}>
        <AdminNavbar />
        <div style={contentStyle}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
