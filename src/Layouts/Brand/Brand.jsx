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
  //   useEffect(() => {
  //     fetch("http://localhost:1234/api/v1/...", {
  //       credentials: "include",
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if (json.body) {
  //           if (json.body.Role === "admin") {
  //             navigate("/admin");
  //           }
  //           setUserInfo(json.body);
  //         } else {
  //           setUserInfo(null);
  //         }
  //       });
  //   }, [userChange]);
  return (
    <>
      <div className="brand-container">
        <Header userInfo={userInfo} setUserInfo={setUserInfo} />
        <Outlet context={{ userInfo, setUserInfo, userChange, changeUser }} />
        <ToastContainer
          position="top-right"
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
