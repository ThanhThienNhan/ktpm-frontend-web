import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  const [error, setError] = useState(false);

  const authenticate = async () => {
    const name = document.querySelector("#login-name").value;
    const password = document.querySelector("#login-password").value;
    try {
      const response = await fetch(
        "http://localhost/auth/v1/api/auth/login",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: name,
            password: password,
          }),
        }
      );
      const data = await response.json();
      console.log(data.data.user)
      const roles = data.data.user.VAITRO;
      if (roles === "Brand") {
        localStorage.setItem("userData",JSON.stringify(data.data.user));
        window.location.href = "/brand";
      } else if (roles === "Admin") {
        localStorage.setItem("userData",JSON.stringify(data.data.user));
        window.location.href = "/admin/dashboard"
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      authenticate();
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
            id="login-name"
            placeholder="Phone Number"
            pattern="0[0-9]{9}"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="input-box">
          <FontAwesomeIcon icon={faLock} className="field-ico" />
          <input
            type="password"
            className="input-field"
            id="login-password"
            placeholder="Password"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="forgot-pwd">
          <a href="">Forgot Password ?</a>
        </div>
        {error && (
          <div className="auth-error-msg">
            Something's incorrect! Please try again
          </div>
        )}
        <button onClick={authenticate} className="submit-btn">
          LOGIN
        </button>
      </div>
      <div className="authen-route">
        Don't have an account?{" "}
        <Link to="/register">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
