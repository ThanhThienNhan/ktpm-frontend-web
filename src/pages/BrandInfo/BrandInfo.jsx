import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./BrandInfo.css";
import { useNavigate } from "react-router-dom";
import { useBrand } from '../../BrandContext';

const BrandInfo = () => {
  const [brandInfo, setBrandInfo] = useState({
    TENTHUONGHIEU: "",
    DIACHI: "",
    LINHVUC: "",
    AVATAR: "",
    ID_THUONGHIEU: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialState, setInitialState] = useState({
    fullName: "",
    address: "",
    brandField: "",
    AVATAR: ""
  });
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [brandField, setBrandField] = useState("");
  const [changeAvt, setChangeAvt] = useState(null);
  const { brandId } = useBrand();
  const navigate = useNavigate();

  useEffect(() => {
    if (brandId) {
      fetch("http://localhost:2999/brand/api/v1/brand/getBrandInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ BrandId: brandId }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setFullName(json.TENTHUONGHIEU || "");
            setAddress(json.DIACHI || "");
            setBrandField(json.LINHVUC || "");
            setBrandInfo({
              ...json,
              TENTHUONGHIEU: json.TENTHUONGHIEU || "",
              DIACHI: json.DIACHI || "",
              LINHVUC: json.LINHVUC || "",
              AVATAR: json.AVATAR || ""
            });
            setInitialState({
              fullName: json.TENTHUONGHIEU || "",
              address: json.DIACHI || "",
              brandField: json.LINHVUC || "",
              AVATAR: json.AVATAR || ""
            });
          } else {
            navigate("/");
          }
        })
        .catch((error) => console.error("Error fetching brand info:", error));
    }
  }, [brandId, navigate]);

  const saveInfoChanges = async () => {
    const formData = new FormData();
    formData.append("BrandId", brandInfo.ID_THUONGHIEU);
    formData.append("TENTHUONGHIEU", fullName);
    formData.append("DIACHI", address);
    formData.append("LINHVUC", brandField);
    if (changeAvt) {
      formData.append("image", changeAvt);
    }

    try {
      const response = await fetch("http://localhost:2999/brand/api/v1/brand/updateBrandInfo", {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setIsEditMode(false);
        window.location.reload();
      } else {
        console.error("There was an error updating the information. Please try again.");
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
        setBrandInfo(prevState => ({ ...prevState, AVATAR: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Please select a valid image file");
    }
  };

  const handleEditMode = () => {
    setInitialState({
      fullName,
      address,
      brandField,
      AVATAR: brandInfo.AVATAR,
    });
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setFullName(initialState.fullName);
    setAddress(initialState.address);
    setBrandField(initialState.brandField);
    setBrandInfo(prevState => ({ ...prevState, AVATAR: initialState.AVATAR }));
    setIsEditMode(false);
  };

  return (
    <>
      <h2>Brand Information</h2>
      <div className="info-avt-container">
        <div className="info--avt">
          <div
            className="avatar-big"
            style={{ backgroundImage: `url(${brandInfo.AVATAR})` }}
          />
          {isEditMode && (
            <>
              <label htmlFor="info--avt-upload" className="info--avt-change">
                <FontAwesomeIcon icon={faEdit} id="info--avt-edit" />
                Change Avatar
              </label>
              <input
                type="file"
                id="info--avt-upload"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
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
