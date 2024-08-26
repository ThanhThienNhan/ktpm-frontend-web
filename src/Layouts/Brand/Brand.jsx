import { useState, useEffect } from "react";
import Header from "./Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useBrand } from "../../BrandContext";  // Import the context
import "react-toastify/dist/ReactToastify.css";
import "./Brand.css";

const Brand = () => {
  const navigate = useNavigate();
  const { setBrandId } = useBrand();  // Get the context setter
  const [userInfo, setUserInfo] = useState({});
  const [userChange, changeUser] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  useEffect(() => {
    const fetchBrandId = async () => {
      if (userData) {
        try {
          const response = await fetch(`http://localhost:2999/brand/api/v1/brand/getBrandId/${userData.ID_TTNGUOIDUNG}`);
          const data = await response.json();
          if (data) {
            setBrandId(data.ID_THUONGHIEU);
          } else {
            console.log("No brand found for this user");
            navigate("/");
          }
        } catch (error) {
          console.error('Error fetching brand ID:', error);
          navigate("/");
        }
      }
    };

    if (userData) {
      fetchBrandId();
    } else {
      navigate("/");
    }
  }, [userData, navigate, setBrandId]);

  useEffect(() => {
    if (!userData) {
      console.log("Unauthorized!");
      navigate("/");
    } else if (userData.VAITRO !== "Brand") {
      console.log("Access Denied!", userData);
      navigate("/");
    }
  }, [userData, navigate]);

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
