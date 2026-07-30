import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaStethoscope,
  FaXRay,
  FaRobot,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* Background Overlay */}
      <div className="overlay"></div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">

          <FaHeartbeat className="logo-icon" />

          <h2>PCOSense AI</h2>

        </div>

        <div className="nav-links">

          <a href="#">Home</a>

          <a href="#">Profile</a>

          <a href="/">Logout</a>

        </div>

      </nav>

      {/* Hero Section */}

      <div className="hero">

        <h1>AI-Powered Multimodal PCOS Detection</h1>

        <p>
          Detect Polycystic Ovary Syndrome using
          Clinical Parameters, Ultrasound Images,
          or combine both using Artificial Intelligence.
        </p>

      </div>

      {/* Cards */}

      <div className="card-container">

        {/* Clinical */}

        <div className="dashboard-card">

          <FaStethoscope className="card-icon" />

          <h2>Clinical Assessment</h2>

          <p>
            Enter patient clinical information including
            symptoms, hormonal values, BMI,
            menstrual history and more.
          </p>

          <Link to="/clinical">

            <button>

              Start Assessment

            </button>

          </Link>

        </div>

        {/* Ultrasound */}

        <div className="dashboard-card">

          <FaXRay className="card-icon" />

          <h2>Ultrasound Analysis</h2>

          <p>
            Upload ovarian ultrasound images
            and let the deep learning model
            analyze PCOS automatically.
          </p>

          <Link to="/ultrasound">

            <button>

              Upload Image

            </button>

          </Link>

        </div>

        {/* Multimodal */}

        <div className="dashboard-card">

          <FaRobot className="card-icon" />

          <h2>Multimodal AI</h2>

          <p>
            Combine both clinical parameters
            and ultrasound images to
            generate the most reliable
            prediction.
          </p>

          <Link to="/multimodal">

            <button>

              Start Analysis

            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;