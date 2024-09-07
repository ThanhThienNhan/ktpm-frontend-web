import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock, faBuilding, faMapMarkerAlt, faIndustry, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [brandName, setBrandName] = useState("");
    const [address, setAddress] = useState("");
    const [brandField, setBrandField] = useState("");

    const registerUser = async () => {
        if (password !== confirmedPassword) {
            setError("Password & Confirmed Password do not match");
            return;
        }

        const userObj = {
            name: "Default",
            email: phone,
            password: password,
        };

        try {
            // Sign up user
            const { data: userData } = await axios.post("http://localhost:2999/auth/v1/api/auth/signup-brand", userObj, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });

            console.log("ID_TTNGUOIDUNG:", userData.data.infoUser.ID_TTNGUOIDUNG);

            const brandObj = {
                TENTHUONGHIEU: brandName,
                DIACHI: address,
                LINHVUC: brandField,
                ID_NGUOIDUNG: userData.data.infoUser.ID_TTNGUOIDUNG
            };

            // Create brand
            await axios.post("http://localhost:2999/brand/api/v1/brand", brandObj, {
                headers: { 'Content-Type': 'application/json' }
            });

            navigate("/");

        } catch (error) {
            console.error("Error:", error);
            if (error.response) {
                setError(error.response.data.error || "Failed to create account or brand");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <>
            <div>
                <div className="input-box">
                    <FontAwesomeIcon icon={faPhone} className="field-ico" />
                    <input
                        type="tel"
                        className="input-field"
                        id="register-phone"
                        placeholder="Phone number"
                        pattern="0[0-9]{9}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="input-box">
                    <FontAwesomeIcon icon={faBuilding} className="field-ico" />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Brand Name"
                        id="register-brandName"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                    />
                </div>

                <div className="input-box">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="field-ico" />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Address"
                        id="register-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="input-box">
                    <FontAwesomeIcon icon={faIndustry} className="field-ico" />
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Field Domain"
                        id="register-brandField"
                        value={brandField}
                        onChange={(e) => setBrandField(e.target.value)}
                    />
                </div>

                <div className="input-box">
                    <FontAwesomeIcon icon={faLock} className="field-ico" />
                    <input
                        type="password"
                        className="input-field"
                        id="register-password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-box">
                    <FontAwesomeIcon icon={faCheck} className="field-ico" />
                    <input
                        type="password"
                        className="input-field"
                        id="register-confirm-password"
                        placeholder="Confirm Password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="auth-error-msg">
                        {error}
                    </div>
                )}

                <div className="agreed-term">
                    By clicking "Register" you agree to our terms and privacy policy.
                </div>
                <button onClick={registerUser} className="submit-btn">
                    REGISTER
                </button>
            </div>
            <div className="authen-route">
                Already have an account? <Link to="/">Sign In</Link>
            </div>
        </>
    );
};

export default Register;
