import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./BrandInfo.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BrandInfo = () => {
  const [brandInfo, setBrandInfo] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialState, setInitialState] = useState({});
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [brandField, setBrandField] = useState("");
  const [changeAvt, setChangeAvt] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/brand/account/success", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.body) {
          setFullName(json.body.FullName);
          setAddress(json.body.Address);
          setBrandField(json.body.BrandField);
          setBrandInfo(json.body);
        } else {
          navigate("/");
        }
      });
  }, [isEditMode]);

  const saveInfoChanges = async () => {
    let formData = new FormData();
    formData.append("fullname", fullName);
    formData.append("address", address);
    formData.append("brandField", brandField);
    formData.append("image", changeAvt);

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/brand/${brandInfo._id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Successfully updated brand information", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsEditMode(false);
      } else {
        toast.error("There was an error updating the information. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setChangeAvt(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandInfo({ ...brandInfo, Image_Avatar: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleEditMode = () => {
    setInitialState({ fullName, address, brandField, Image_Avatar: brandInfo.Image_Avatar });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setFullName(initialState.fullName);
    setAddress(initialState.address);
    setBrandField(initialState.brandField);
    setBrandInfo({ ...brandInfo, Image_Avatar: initialState.Image_Avatar });
    setIsEditMode(false);
  };

  return (
    <>
      <h2>Brand Information</h2>
      <div className="info-avt-container">
        <div className="info--avt">
          <div
            className="avatar-big"
            style={{ backgroundImage: `url(${brandInfo.Image_Avatar})` }}
          ></div>
          {isEditMode && (
            <>
              <label htmlFor="info--avt-upload" className="info--avt-change">
                <FontAwesomeIcon icon={faEdit} id="info--avt-edit" />
                Change Avatar
              </label>
              <input
                type="file"
                id="info--avt-upload"
                accept="image/*" // Only accept image
                onChange={handleAvatarChange}
                style={{ display: 'none' }} // Hide the file input
              />
            </>
          )}
        </div>

        <div className="info">
          <div className="info-field">
            <h3 className="title-input">Full Name</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>
          
          <div className="info-field">
            <h3 className="title-input">Address</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-field">
            <h3 className="title-input">Brand Field</h3>
            <input
              className="info-inp"
              type="text"
              placeholder="Unknown"
              value={brandField}
              onChange={(e) => setBrandField(e.target.value)}
              readOnly={!isEditMode}
            />
          </div>

          <div className="info-action-row">
            <div className="info-action-btn-container">
              {isEditMode ? (
                <>
                  <div
                    className="info-action-btn"
                    id="info-save-btn"
                    onClick={saveInfoChanges}
                  >
                    Save
                  </div>
                  <div
                    className="info-action-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </div>
                </>
              ) : (
                <div
                  className="info-action-btn"
                  onClick={handleEditMode}
                >
                  Change Information
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandInfo;
