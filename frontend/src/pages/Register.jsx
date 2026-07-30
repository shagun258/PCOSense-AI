import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeartbeat,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    // Backend registration will be connected later

    navigate("/home");

  };

  return (

    <div className="register-page">

      <div className="overlay"></div>

      <div className="register-container">

        <div className="register-header">

          <FaHeartbeat className="register-logo"/>

          <h1>PCOSense AI</h1>

          <p>

            Create your account to access the AI-powered
            Multimodal PCOS Detection Platform.

          </p>

        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <FaUser className="input-icon"/>

            <input
              type="text"
              placeholder="Full Name"
              required
            />

          </div>

          <div className="input-group">

            <FaEnvelope className="input-icon"/>

            <input
              type="email"
              placeholder="Email Address"
              required
            />

          </div>

          <div className="input-group">

            <FaPhone className="input-icon"/>

            <input
              type="tel"
              placeholder="Phone Number"
              required
            />

          </div>

          <div className="input-group">

            <FaUser className="input-icon"/>

            <input
              type="number"
              placeholder="Age"
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <div className="input-group">

            <FaLock className="input-icon"/>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
            />

            <span
              className="eye-icon"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

          <div className="terms">

            <label>

              <input
                type="checkbox"
                required
              />

              I agree to the Terms & Conditions

            </label>

          </div>

          <button
            type="submit"
            className="register-btn"
          >

            Create Account

          </button>

          <div className="login-link">

            Already have an account?

            <Link to="/">

              <span> Login</span>

            </Link>

          </div>

        </form>

      </div>

    </div>

  );

}

export default Register;