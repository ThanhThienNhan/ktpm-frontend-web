import { useState, useEffect } from "react";
import Header from "./Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Brand.css"
const Brand = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [userChange, changeUser] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    console.log(userData);
    try{
      if(!userData){
        console.log("Unauthorized!");
        navigate("/");
      }
      if(userData.VAITRO !== "Brand"){
        console.log("Access Denied!", userData);
        navigate("/");
      }
    }catch(error){
      console.log(error);
      navigate("/");
    }

  }, [userData]);

  return (
    <>
      <div className="brand-container">
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        <Outlet context={{ userInfo, setUserInfo, userChange, changeUser }} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default Brand;
