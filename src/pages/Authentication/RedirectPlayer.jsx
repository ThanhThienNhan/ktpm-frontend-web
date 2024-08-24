import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/user/account/success", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.body) {
          window.location.href = "/";
        }
      });
  }, []);

  const login = async () => {
    const name = document.querySelector("#login-name").value;
    const password = document.querySelector("#login-password").value;
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/user/account/login",
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.body) {
        window.location.href = "/";
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
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
        <button onClick={login} className="submit-btn">
          LOGIN
        </button>
      </div>
      <div className="authen-route">
        Don't have an account?{" "}
        <Link to="/authentication/register">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
