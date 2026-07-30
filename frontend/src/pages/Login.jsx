import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Login.css";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    // Backend authentication will be connected later

    navigate("/home");

  };

  return (

    <div className="login-page">

      <div className="overlay"></div>

      <div className="login-container">

        <div className="logo-section">

          <FaUserMd className="logo-icon"/>

          <h1>PCOSense AI</h1>

          <p>
            AI-Powered Multimodal PCOS Detection Platform
          </p>

        </div>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="input-group">

            <FaEnvelope className="input-icon"/>

            <input
              type="email"
              placeholder="Email Address"
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <div className="login-options">

            <label>

              <input type="checkbox"/>

              Remember Me

            </label>

            <a href="#">Forgot Password?</a>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

          <div className="register-link">

            Don't have an account?

            <Link to="/register">

              <span> Register</span>

            </Link>

          </div>

        </form>

      </div>

    </div>

  );

}

export default Login;