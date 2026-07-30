import React, { useState } from "react";
import "../styles/Multimodal.css";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  FaBrain,
  FaArrowLeft,
  FaUserInjured,
  FaHeartbeat,
  FaNotesMedical,
  FaFlask,
  FaImage,
  FaUpload,
} from "react-icons/fa";

function Multimodal() {

  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState(null);

  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({

    age:"",
    weight:"",
    height:"",
    bmi:"",
    bloodGroup:"",
    pulseRate:"",
    rr:"",
    hb:"",
    cycle:"",
    cycleLength:"",
    marriageYears:"",
    pregnant:"",
    abortions:"",
    betaHCG1:"",
    betaHCG2:"",
    fsh:"",
    lh:"",
    fshlh:"",
    hip:"",
    waist:"",
    waistHipRatio:"",
    tsh:"",
    amh:"",
    prl:"",
    vitaminD3:"",
    progesterone:"",
    rbs:"",
    weightGain:"",
    hairGrowth:"",
    skinDarkening:"",
    hairLoss:"",
    pimples:"",
    fastFood:"",
    exercise:"",
    bpSystolic:"",
    bpDiastolic:"",
    follicleLeft:"",
    follicleRight:"",
    follicleSizeLeft:"",
    follicleSizeRight:"",
    endometrium:""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if(file){

      setSelectedImage(file);

      setPreview(URL.createObjectURL(file));

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setPrediction(null);

    setError("");

    try{

      const data = new FormData();

      Object.keys(formData).forEach((key)=>{

        data.append(key,formData[key]);

      });

      data.append("image",selectedImage);

      const res = await axios.post(

        "http://127.0.0.1:5000/predict-multimodal",

        data

      );

      setPrediction(res.data);

    }

    catch(err){

      setError(

        err.response?.data?.error ||

        "Prediction Failed"

      );

    }

    setLoading(false);

  };
    return (

    <div className="multimodal-container">

      <Link to="/home" className="back-btn">

        <FaArrowLeft />

        Back

      </Link>

      <h1 className="page-title">

        <FaBrain />

        PCOS Multimodal Prediction

      </h1>

      <p className="page-subtitle">

        Clinical + Ultrasound AI Fusion

      </p>

      <form onSubmit={handleSubmit}>

        {/* ================================================= */}
        {/* Patient Information */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaUserInjured />

            Patient Information

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="age"
              placeholder="Age (Years)"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight (Kg)"
              value={formData.weight}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="bmi"
              placeholder="BMI"
              value={formData.bmi}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="bloodGroup"
              placeholder="Blood Group (1-8)"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* Vital Signs */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaHeartbeat />

            Vital Signs

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="pulseRate"
              placeholder="Pulse Rate (bpm)"
              value={formData.pulseRate}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="rr"
              placeholder="Respiratory Rate"
              value={formData.rr}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="hb"
              placeholder="Hemoglobin (g/dL)"
              value={formData.hb}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="bpSystolic"
              placeholder="BP Systolic (mmHg)"
              value={formData.bpSystolic}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="bpDiastolic"
              placeholder="BP Diastolic (mmHg)"
              value={formData.bpDiastolic}
              onChange={handleChange}
              required
            />

          </div>

        </div>
                {/* ================================================= */}
        {/* Menstrual History */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaNotesMedical />

            Menstrual History

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="cycle"
              placeholder="Cycle (0 = Regular, 1 = Irregular)"
              value={formData.cycle}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="cycleLength"
              placeholder="Cycle Length (days)"
              value={formData.cycleLength}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="marriageYears"
              placeholder="Marriage Status (Years)"
              value={formData.marriageYears}
              onChange={handleChange}
            />

            <input
              type="number"
              name="pregnant"
              placeholder="Pregnant (0/1)"
              value={formData.pregnant}
              onChange={handleChange}
            />

            <input
              type="number"
              name="abortions"
              placeholder="No. of Abortions"
              value={formData.abortions}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* Hormonal Parameters */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaFlask />

            Hormonal Parameters

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="betaHCG1"
              placeholder="β-HCG I (mIU/mL)"
              value={formData.betaHCG1}
              onChange={handleChange}
            />

            <input
              type="number"
              name="betaHCG2"
              placeholder="β-HCG II (mIU/mL)"
              value={formData.betaHCG2}
              onChange={handleChange}
            />

            <input
              type="number"
              name="fsh"
              placeholder="FSH (mIU/mL)"
              value={formData.fsh}
              onChange={handleChange}
            />

            <input
              type="number"
              name="lh"
              placeholder="LH (mIU/mL)"
              value={formData.lh}
              onChange={handleChange}
            />

            <input
              type="number"
              name="fshlh"
              placeholder="FSH/LH Ratio"
              value={formData.fshlh}
              onChange={handleChange}
            />

            <input
              type="number"
              name="tsh"
              placeholder="TSH (mIU/L)"
              value={formData.tsh}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amh"
              placeholder="AMH (ng/mL)"
              value={formData.amh}
              onChange={handleChange}
            />

            <input
              type="number"
              name="prl"
              placeholder="PRL (ng/mL)"
              value={formData.prl}
              onChange={handleChange}
            />

            <input
              type="number"
              name="vitaminD3"
              placeholder="Vitamin D3 (ng/mL)"
              value={formData.vitaminD3}
              onChange={handleChange}
            />

            <input
              type="number"
              name="progesterone"
              placeholder="Progesterone (ng/mL)"
              value={formData.progesterone}
              onChange={handleChange}
            />

          </div>

        </div>
                {/* ================================================= */}
        {/* Body Measurements */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaHeartbeat />

            Body Measurements

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="hip"
              placeholder="Hip (inch)"
              value={formData.hip}
              onChange={handleChange}
            />

            <input
              type="number"
              name="waist"
              placeholder="Waist (inch)"
              value={formData.waist}
              onChange={handleChange}
            />

            <input
              type="number"
              name="waistHipRatio"
              placeholder="Waist : Hip Ratio"
              value={formData.waistHipRatio}
              onChange={handleChange}
            />

            <input
              type="number"
              name="rbs"
              placeholder="RBS (mg/dL)"
              value={formData.rbs}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* Symptoms */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaNotesMedical />

            Symptoms

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="weightGain"
              placeholder="Weight Gain (0/1)"
              value={formData.weightGain}
              onChange={handleChange}
            />

            <input
              type="number"
              name="hairGrowth"
              placeholder="Hair Growth (0/1)"
              value={formData.hairGrowth}
              onChange={handleChange}
            />

            <input
              type="number"
              name="skinDarkening"
              placeholder="Skin Darkening (0/1)"
              value={formData.skinDarkening}
              onChange={handleChange}
            />

            <input
              type="number"
              name="hairLoss"
              placeholder="Hair Loss (0/1)"
              value={formData.hairLoss}
              onChange={handleChange}
            />

            <input
              type="number"
              name="pimples"
              placeholder="Pimples (0/1)"
              value={formData.pimples}
              onChange={handleChange}
            />

            <input
              type="number"
              name="fastFood"
              placeholder="Fast Food (0/1)"
              value={formData.fastFood}
              onChange={handleChange}
            />

            <input
              type="number"
              name="exercise"
              placeholder="Regular Exercise (0/1)"
              value={formData.exercise}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ================================================= */}
        {/* Ultrasound Numeric Findings */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaImage />

            Ultrasound Findings

          </h2>

          <div className="form-grid">

            <input
              type="number"
              name="follicleLeft"
              placeholder="Follicle No. (Left)"
              value={formData.follicleLeft}
              onChange={handleChange}
            />

            <input
              type="number"
              name="follicleRight"
              placeholder="Follicle No. (Right)"
              value={formData.follicleRight}
              onChange={handleChange}
            />

            <input
              type="number"
              name="follicleSizeLeft"
              placeholder="Avg Follicle Size Left (mm)"
              value={formData.follicleSizeLeft}
              onChange={handleChange}
            />

            <input
              type="number"
              name="follicleSizeRight"
              placeholder="Avg Follicle Size Right (mm)"
              value={formData.follicleSizeRight}
              onChange={handleChange}
            />

            <input
              type="number"
              name="endometrium"
              placeholder="Endometrium (mm)"
              value={formData.endometrium}
              onChange={handleChange}
            />

          </div>

        </div>
                {/* ================================================= */}
        {/* Ultrasound Image Upload */}
        {/* ================================================= */}

        <div className="section-card">

          <h2>

            <FaImage />

            Upload Ultrasound Image

          </h2>

          <div className="upload-area">

            {

              preview ?

              (

                <img

                  src={preview}

                  alt="Ultrasound Preview"

                  className="preview-image"

                />

              )

              :

              (

                <div className="empty-preview">

                  <FaImage size={70} />

                  <p>No Image Selected</p>

                </div>

              )

            }

          </div>

          <br />

          <label className="upload-btn">

            <FaUpload />

            Choose Ultrasound Image

            <input

              type="file"

              accept="image/*"

              hidden

              onChange={handleImageChange}

            />

          </label>

          {

            selectedImage && (

              <p className="filename">

                {selectedImage.name}

              </p>

            )

          }

        </div>

        {/* ================================================= */}
        {/* Predict Button */}
        {/* ================================================= */}

        <button

          type="submit"

          className="predict-btn"

          disabled={loading}

        >

          {

            loading

            ?

            "Predicting..."

            :

            "Predict PCOS"

          }

        </button>
                {/* ================================================= */}
        {/* Prediction Result */}
        {/* ================================================= */}

        {prediction && (

          <div className="result-card">

            <h2>Prediction Result</h2>

            <div className="result-grid">

              <div className="score-box">
                <h3>Clinical Confidence</h3>
                <p>{prediction.clinical_confidence}%</p>
              </div>

              <div className="score-box">
                <h3>Ultrasound Confidence</h3>
                <p>{prediction.ultrasound_confidence}%</p>
              </div>

              <div className="score-box final-score">
                <h3>Final Confidence</h3>
                <p>{prediction.final_confidence}%</p>
              </div>

            </div>

            <h2
              className={
                prediction.prediction === "PCOS Positive"
                  ? "positive"
                  : "negative"
              }
            >
              {prediction.prediction}
            </h2>

          </div>

        )}

        {/* ================================================= */}
        {/* Error Message */}
        {/* ================================================= */}

        {error && (

          <div className="error-card">

            <p>{error}</p>

          </div>

        )}

      </form>

    </div>

  );

}

export default Multimodal;
               