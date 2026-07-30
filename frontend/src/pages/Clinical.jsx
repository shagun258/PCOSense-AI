import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeartbeat,
  FaUserInjured,
  FaNotesMedical,
  FaFlask,
} from "react-icons/fa";

import "../styles/Clinical.css";

function Clinical() {

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({

    // ===============================
    // Patient Information
    // ===============================

    age: "",
    weight: "",
    height: "",
    bmi: "",
    bloodGroup: "",

    // ===============================
    // Vital Signs
    // ===============================

    pulseRate: "",
    rr: "",
    hb: "",
    bpSystolic: "",
    bpDiastolic: "",

    // ===============================
    // Menstrual History
    // ===============================

    cycle: "",
    cycleLength: "",
    marriageYears: "",
    pregnant: "",
    abortions: "",

    // ===============================
    // Hormonal Profile
    // ===============================

    betaHCG1: "",
    betaHCG2: "",
    fsh: "",
    lh: "",
    fshlh: "",
    tsh: "",
    amh: "",
    prl: "",
    vitaminD3: "",
    progesterone: "",

    // ===============================
    // Body Measurements
    // ===============================

    waist: "",
    hip: "",
    waistHipRatio: "",
    rbs: "",

    // ===============================
    // Symptoms
    // ===============================

    weightGain: "",
    hairGrowth: "",
    skinDarkening: "",
    hairLoss: "",
    pimples: "",
    fastFood: "",
    exercise: "",

    // ===============================
    // Ultrasound
    // ===============================

    follicleLeft: "",
    follicleRight: "",
    follicleSizeLeft: "",
    follicleSizeRight: "",
    endometrium: ""

  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setPrediction(null);
    setError("");

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/predict-clinical",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {

        setPrediction(result);

      } else {

        setError(result.error || "Prediction Failed");

      }

    } catch (err) {

      console.error(err);
      setError("Cannot connect to backend.");

    }

    setLoading(false);

  };

  return (

    <div className="clinical-page">

      <div className="clinical-overlay"></div>

      <nav className="clinical-navbar">

        <Link to="/home" className="back-btn">

          <FaArrowLeft />

          Back

        </Link>

        <div className="clinical-logo">

          <FaHeartbeat />

          <span>PCOSense AI</span>

        </div>

      </nav>

      <div className="clinical-header">

        <h1>Clinical Assessment</h1>

        <p>

          Enter all clinical parameters required for AI-based PCOS Prediction.

        </p>

      </div>

      <form className="clinical-form" onSubmit={handleSubmit}>
              {/* ============================
          Patient Information
      ============================= */}

      <div className="form-card">

        <h2>
          <FaUserInjured />
          Patient Information
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>Age (Years)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          <div className="input-box">
            <label>Weight (Kg)</label>
            <input type="number" step="0.01" name="weight" value={formData.weight} onChange={handleChange} required />
          </div>

          <div className="input-box">
            <label>Height (cm)</label>
            <input type="number" step="0.01" name="height" value={formData.height} onChange={handleChange} required />
          </div>

          <div className="input-box">
            <label>BMI</label>
            <input type="number" step="0.01" name="bmi" value={formData.bmi} onChange={handleChange} required />
          </div>

          <div className="input-box">
            <label>Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="11">A+</option>
              <option value="12">A-</option>
              <option value="13">B+</option>
              <option value="14">B-</option>
              <option value="15">O+</option>
              <option value="16">O-</option>
              <option value="17">AB+</option>
              <option value="18">AB-</option>
            </select>
          </div>

        </div>

      </div>

      {/* ============================
            Vital Signs
      ============================= */}

      <div className="form-card">

        <h2>
          <FaHeartbeat />
          Vital Signs
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>Pulse Rate (bpm)</label>
            <input
              type="number"
              name="pulseRate"
              value={formData.pulseRate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Respiratory Rate</label>
            <input
              type="number"
              name="rr"
              value={formData.rr}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Hb (g/dL)</label>
            <input
              type="number"
              step="0.01"
              name="hb"
              value={formData.hb}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>BP Systolic (mmHg)</label>
            <input
              type="number"
              name="bpSystolic"
              value={formData.bpSystolic}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>BP Diastolic (mmHg)</label>
            <input
              type="number"
              name="bpDiastolic"
              value={formData.bpDiastolic}
              onChange={handleChange}
              required
            />
          </div>

        </div>

      </div>
            {/* ============================
            Menstrual History
      ============================= */}

      <div className="form-card">

        <h2>
          <FaNotesMedical />
          Menstrual History
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>Cycle (R/I)</label>
            <select
              name="cycle"
              value={formData.cycle}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="2">Regular</option>
              <option value="4">Irregular</option>
            </select>
          </div>

          <div className="input-box">
            <label>Cycle Length (Days)</label>
            <input
              type="number"
              name="cycleLength"
              value={formData.cycleLength}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Marriage Status (Years)</label>
            <input
              type="number"
              step="0.1"
              name="marriageYears"
              value={formData.marriageYears}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Pregnant</label>
            <select
              name="pregnant"
              value={formData.pregnant}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>No. of Abortions</label>
            <input
              type="number"
              name="abortions"
              value={formData.abortions}
              onChange={handleChange}
              required
            />
          </div>

        </div>

      </div>

      {/* ============================
          Hormonal Parameters
      ============================= */}

      <div className="form-card">

        <h2>
          <FaFlask />
          Hormonal Parameters
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>β-HCG I (mIU/mL)</label>
            <input
              type="number"
              step="0.01"
              name="betaHCG1"
              value={formData.betaHCG1}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>β-HCG II (mIU/mL)</label>
            <input
              type="number"
              step="0.01"
              name="betaHCG2"
              value={formData.betaHCG2}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>FSH (mIU/mL)</label>
            <input
              type="number"
              step="0.01"
              name="fsh"
              value={formData.fsh}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>LH (mIU/mL)</label>
            <input
              type="number"
              step="0.01"
              name="lh"
              value={formData.lh}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>FSH / LH Ratio</label>
            <input
              type="number"
              step="0.01"
              name="fshlh"
              value={formData.fshlh}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>TSH (mIU/L)</label>
            <input
              type="number"
              step="0.01"
              name="tsh"
              value={formData.tsh}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>AMH (ng/mL)</label>
            <input
              type="number"
              step="0.01"
              name="amh"
              value={formData.amh}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>PRL (ng/mL)</label>
            <input
              type="number"
              step="0.01"
              name="prl"
              value={formData.prl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Vitamin D3 (ng/mL)</label>
            <input
              type="number"
              step="0.01"
              name="vitaminD3"
              value={formData.vitaminD3}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Progesterone (ng/mL)</label>
            <input
              type="number"
              step="0.01"
              name="progesterone"
              value={formData.progesterone}
              onChange={handleChange}
              required
            />
          </div>

        </div>

      </div>
            {/* ============================
          Body Measurements
      ============================= */}

      <div className="form-card">

        <h2>
          <FaUserInjured />
          Body Measurements
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>Waist (inch)</label>
            <input
              type="number"
              name="waist"
              value={formData.waist}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Hip (inch)</label>
            <input
              type="number"
              name="hip"
              value={formData.hip}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Waist : Hip Ratio</label>
            <input
              type="number"
              step="0.01"
              name="waistHipRatio"
              value={formData.waistHipRatio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Random Blood Sugar (mg/dL)</label>
            <input
              type="number"
              step="0.01"
              name="rbs"
              value={formData.rbs}
              onChange={handleChange}
              required
            />
          </div>

        </div>

      </div>

      {/* ============================
          Symptoms
      ============================= */}

      <div className="form-card">

        <h2>
          <FaNotesMedical />
          Symptoms
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>Weight Gain</label>
            <select
              name="weightGain"
              value={formData.weightGain}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>Hair Growth</label>
            <select
              name="hairGrowth"
              value={formData.hairGrowth}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>Skin Darkening</label>
            <select
              name="skinDarkening"
              value={formData.skinDarkening}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>Hair Loss</label>
            <select
              name="hairLoss"
              value={formData.hairLoss}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>Pimples</label>
            <select
              name="pimples"
              value={formData.pimples}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>Fast Food Consumption</label>
            <select
              name="fastFood"
              value={formData.fastFood}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="input-box">
            <label>Regular Exercise</label>
            <select
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

        </div>

      </div>

      {/* ============================
          Ultrasound Findings
      ============================= */}

      <div className="form-card">

        <h2>
          <FaFlask />
          Ultrasound Findings
        </h2>

        <div className="grid">

          <div className="input-box">
            <label>Follicle No. (Left)</label>
            <input
              type="number"
              name="follicleLeft"
              value={formData.follicleLeft}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Follicle No. (Right)</label>
            <input
              type="number"
              name="follicleRight"
              value={formData.follicleRight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Average Follicle Size Left (mm)</label>
            <input
              type="number"
              step="0.01"
              name="follicleSizeLeft"
              value={formData.follicleSizeLeft}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Average Follicle Size Right (mm)</label>
            <input
              type="number"
              step="0.01"
              name="follicleSizeRight"
              value={formData.follicleSizeRight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Endometrium (mm)</label>
            <input
              type="number"
              step="0.01"
              name="endometrium"
              value={formData.endometrium}
              onChange={handleChange}
              required
            />
          </div>

        </div>

      </div>
            {/* ============================
            Predict Button
      ============================= */}

      <div className="submit-section">

        <button
          type="submit"
          className="predict-btn"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict PCOS"}
        </button>

      </div>

      {/* ============================
            Prediction Result
      ============================= */}

      {prediction && (

        <div className="result-card">

          <h2>Prediction Result</h2>

          <h1
            className={
              prediction.prediction === "PCOS Positive"
                ? "positive"
                : "negative"
            }
          >
            {prediction.prediction}
          </h1>

          <h3>
            Confidence :
            {" "}
            {(prediction.confidence * 100).toFixed(2)}%
          </h3>

        </div>

      )}

      {/* ============================
            Error Message
      ============================= */}

      {error && (

        <div className="error-card">

          <h3>{error}</h3>

        </div>

      )}

      </form>

    </div>

  );

}

export default Clinical;