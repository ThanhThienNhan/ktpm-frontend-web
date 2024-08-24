import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const registerUser = async () => {
        const phone = document.querySelector("#register-phone").value;
        const password = document.querySelector("#register-password").value;
        const confirmedPassword = document.querySelector(
            "#register-confirm-password"
        ).value;
        if (password === confirmedPassword) {
            setError(false);
            const sendObj = {
                name: "Default",
                email: phone,
                password: password
            };
            try {
                if (password == confirmedPassword) {
                    const response = await fetch("http://localhost:2999/auth/v1/api/auth/signup-brand", {
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(sendObj),
                    });
    
                    if (response.ok) {
                        navigate("/");
                    } else {
                        console.error("Failed to create post");
                    }
                } else {
                    // handle later
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            setError(true);
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
                    />
                </div>
                <div className="input-box">
                    <FontAwesomeIcon icon={faLock} className="field-ico" />
                    <input
                        type="password"
                        className="input-field"
                        id="register-password"
                        placeholder="Password"
                    />
                </div>
                <div className="input-box">
                    <FontAwesomeIcon icon={faLock} className="field-ico" />
                    <input
                        type="password"
                        className="input-field"
                        id="register-confirm-password"
                        placeholder="Confirm Password"
                    />
                </div>
                {error && (
                    <div className="auth-error-msg">
                        Password & Confirmed Password do not match
                    </div>
                )}
                
                <div className="input-box">
                    <input
                        className="input-field"
                        id="register-phone"
                        placeholder="Company name"
                        pattern="0[0-9]{9}"
                    />
                </div>

                <div className="input-box">
                    <input
                        className="input-field"
                        id="register-phone"
                        placeholder="Field Domain"
                        pattern="0[0-9]{9}"
                    />
                </div>

                <div className="input-box">
                    <input
                        className="input-field"
                        id="register-phone"
                        placeholder="Address"
                        pattern="0[0-9]{9}"
                    />
                </div>




                <div className="agreed-term">
                    By clicking "Register" you agree to our terms and privacy policy.
                </div>
                <button onClick={registerUser} className="submit-btn">
                    REGISTER
                </button>
            </div>
            <div className="authen-route">
                Already have an account? <Link to="/authentication/login">Sign In</Link>
            </div>
        </>
    );
};

export default Register;
