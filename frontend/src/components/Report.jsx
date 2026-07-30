import React from "react";
import "./Report.css";
import { downloadReportPDF } from "../utils/pdfGenerator";

const Report = ({ result, patient }) => {
  if (!result) return null;

  // ==============================
  // Confidence & Risk Calculation
  // ==============================

  const confidence = Number(result.final_confidence || 0);

  let riskLevel = "Low";
  let riskColor = "#22c55e";

  if (confidence >= 90) {
    riskLevel = "Very High";
    riskColor = "#dc2626";
  } else if (confidence >= 80) {
    riskLevel = "High";
    riskColor = "#ef4444";
  } else if (confidence >= 65) {
    riskLevel = "Moderate";
    riskColor = "#f59e0b";
  } else if (confidence >= 50) {
    riskLevel = "Mild";
    riskColor = "#eab308";
  }

  // ==============================
  // Date & Time
  // ==============================

  const now = new Date();

  const reportDate = now.toLocaleDateString();

  const reportTime = now.toLocaleTimeString();

  // ==============================
  // Component
  // ==============================

  return (

    <div
      className="report-container"
      id="pcos-report"
    >

      {/* ================= COVER ================= */}

      <div className="report-cover">

        <h1>PCOSense-AI</h1>

        <h2>
          Artificial Intelligence Based
          <br />
          Multimodal PCOS Detection System
        </h2>

        <p>
          AI Generated Diagnostic Report
        </p>

      </div>

      {/* ================= HEADER ================= */}

      <div className="report-header">

        <div>

          <h2>Diagnostic Report</h2>

          <p>
            Generated using Clinical Parameters &
            Ultrasound Image Analysis
          </p>

        </div>

        <div className="hospital-box">

          <h3>PCOSense-AI</h3>

          <p>Department of Computer Science & Engineering</p>

          <p>B.Tech Final Year Project</p>

        </div>

      </div>

      {/* ================= PATIENT DETAILS ================= */}

      <div className="report-section">

        <h3>Patient Information</h3>

        <div className="patient-grid">

          <div>

            <strong>Patient Name</strong>

            <p>
              {patient?.name || "Not Provided"}
            </p>

          </div>

          <div>

            <strong>Age</strong>

            <p>
              {patient?.age || "--"} Years
            </p>

          </div>

          <div>

            <strong>Date</strong>

            <p>{reportDate}</p>

          </div>

          <div>

            <strong>Time</strong>

            <p>{reportTime}</p>

          </div>

        </div>

      </div>
            {/* ================= PREDICTION SUMMARY ================= */}

      <div className="report-section">

        <h3>Prediction Summary</h3>

        <div className="prediction-banner">

          <h2
            style={{
              color:
                result.prediction === "PCOS Positive"
                  ? "#dc2626"
                  : "#16a34a"
            }}
          >
            {result.prediction}
          </h2>

          <p>

            This prediction is generated using the
            AI-based multimodal PCOS detection model
            by combining clinical parameters and
            ultrasound image analysis.

          </p>

        </div>

      </div>

      {/* ================= CONFIDENCE SCORES ================= */}

      <div className="report-section">

        <h3>Confidence Analysis</h3>

        <div className="prediction-grid">

          {/* Clinical */}

          <div className="prediction-card">

            <h4>Clinical Model</h4>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${Number(result.clinical_confidence || 0)}%`
                }}
              ></div>

            </div>

            <h2>

              {Number(
                result.clinical_confidence || 0
              ).toFixed(2)}%

            </h2>

          </div>

          {/* Ultrasound */}

          <div className="prediction-card">

            <h4>Ultrasound Model</h4>

            <div className="progress">

              <div
                className="progress-fill"
                style={{
                  width: `${Number(result.ultrasound_confidence || 0)}%`
                }}
              ></div>

            </div>

            <h2>

              {Number(
                result.ultrasound_confidence || 0
              ).toFixed(2)}%

            </h2>

          </div>

          {/* Final */}

          <div className="prediction-card final-card">

            <h4>Final AI Decision</h4>

            <div className="progress">

              <div
                className="progress-fill final-fill"
                style={{
                  width: `${Number(result.final_confidence || 0)}%`
                }}
              ></div>

            </div>

            <h2>

              {Number(
                result.final_confidence || 0
              ).toFixed(2)}%

            </h2>

          </div>

        </div>

      </div>

      {/* ================= RISK ASSESSMENT ================= */}

      <div className="report-section">

        <h3>Risk Assessment</h3>

        <div
          className="risk-box"
          style={{
            borderLeft: `8px solid ${riskColor}`
          }}
        >

          <span
            className="risk-badge"
            style={{
              background: riskColor
            }}
          >

            {riskLevel}

          </span>

          <p>

            Overall AI confidence indicates a
            <strong> {riskLevel} </strong>
            probability based on combined
            clinical and ultrasound findings.

          </p>

        </div>

      </div>
            {/* ================= AI INTERPRETATION ================= */}

      <div className="report-section">

        <h3>AI Interpretation</h3>

        <div className="interpretation-box">

          {result.prediction === "PCOS Positive" ? (

            <>
              <p>

                The multimodal Artificial Intelligence model
                predicts that the patient has a significant
                likelihood of exhibiting characteristics
                associated with <strong>Polycystic Ovary Syndrome (PCOS)</strong>.

              </p>

              <p>

                This decision is based on the combined analysis
                of clinical parameters and ultrasound imaging.
                Clinical indicators together with ovarian image
                features increased the overall confidence of
                the prediction.

              </p>

              <p>

                Although the AI model indicates a positive
                screening result, the final diagnosis should
                always be confirmed through consultation with
                a qualified gynecologist and appropriate
                laboratory investigations.

              </p>

            </>

          ) : (

            <>

              <p>

                The multimodal Artificial Intelligence model
                did not identify sufficient evidence suggestive
                of Polycystic Ovary Syndrome (PCOS).

              </p>

              <p>

                Both the clinical parameters and ultrasound
                image analysis indicate a low probability
                of PCOS based on the available information.

              </p>

              <p>

                Continue maintaining a healthy lifestyle and
                undergo routine medical examinations if any
                hormonal or menstrual symptoms develop in
                the future.

              </p>

            </>

          )}

        </div>

      </div>

      {/* ================= DOCTOR RECOMMENDATION ================= */}

      <div className="report-section">

        <h3>Doctor Recommendation</h3>

        <div className="recommendation-box">

          {result.prediction === "PCOS Positive" ? (

            <>

              <h4 style={{ color: "#dc2626" }}>

                Immediate Medical Consultation Recommended

              </h4>

              <ul>

                <li>Consult a Gynecologist or Endocrinologist.</li>

                <li>Confirm diagnosis using laboratory investigations.</li>

                <li>Discuss treatment options with your physician.</li>

                <li>Monitor menstrual cycle regularly.</li>

                <li>Maintain a healthy body weight.</li>

                <li>Follow a balanced low-glycemic diet.</li>

                <li>Exercise at least 30–45 minutes daily.</li>

              </ul>

            </>

          ) : (

            <>

              <h4 style={{ color: "#16a34a" }}>

                Continue Healthy Lifestyle

              </h4>

              <ul>

                <li>Maintain regular physical activity.</li>

                <li>Eat a balanced nutritious diet.</li>

                <li>Drink sufficient water every day.</li>

                <li>Sleep for 7–8 hours daily.</li>

                <li>Continue routine health check-ups.</li>

                <li>Consult a doctor if symptoms appear later.</li>

              </ul>

            </>

          )}

        </div>

      </div>

      {/* ================= PERSONALIZED AI ADVICE ================= */}

      <div className="report-section">

        <h3>Personalized AI Advice</h3>

        <div className="advice-box">

          {result.prediction === "PCOS Positive" ? (

            <>

              <p>

                Based on the multimodal analysis, lifestyle
                modification should begin as early as possible.

              </p>

              <p>

                Regular exercise, weight management, stress
                reduction, and adherence to medical advice
                can significantly improve long-term health
                outcomes.

              </p>

            </>

          ) : (

            <>

              <p>

                Your current screening results appear normal.

              </p>

              <p>

                Continue following healthy dietary habits,
                exercise regularly, and monitor menstrual
                health to reduce future risk.

              </p>

            </>

          )}

        </div>

      </div>
            {/* ================= AI INTERPRETATION ================= */}

      <div className="report-section">

        <h3>AI Interpretation</h3>

        <div className="interpretation-box">

          {result.prediction === "PCOS Positive" ? (

            <>
              <p>

                The multimodal Artificial Intelligence model
                predicts that the patient has a significant
                likelihood of exhibiting characteristics
                associated with <strong>Polycystic Ovary Syndrome (PCOS)</strong>.

              </p>

              <p>

                This decision is based on the combined analysis
                of clinical parameters and ultrasound imaging.
                Clinical indicators together with ovarian image
                features increased the overall confidence of
                the prediction.

              </p>

              <p>

                Although the AI model indicates a positive
                screening result, the final diagnosis should
                always be confirmed through consultation with
                a qualified gynecologist and appropriate
                laboratory investigations.

              </p>

            </>

          ) : (

            <>

              <p>

                The multimodal Artificial Intelligence model
                did not identify sufficient evidence suggestive
                of Polycystic Ovary Syndrome (PCOS).

              </p>

              <p>

                Both the clinical parameters and ultrasound
                image analysis indicate a low probability
                of PCOS based on the available information.

              </p>

              <p>

                Continue maintaining a healthy lifestyle and
                undergo routine medical examinations if any
                hormonal or menstrual symptoms develop in
                the future.

              </p>

            </>

          )}

        </div>

      </div>

      {/* ================= DOCTOR RECOMMENDATION ================= */}

      <div className="report-section">

        <h3>Doctor Recommendation</h3>

        <div className="recommendation-box">

          {result.prediction === "PCOS Positive" ? (

            <>

              <h4 style={{ color: "#dc2626" }}>

                Immediate Medical Consultation Recommended

              </h4>

              <ul>

                <li>Consult a Gynecologist or Endocrinologist.</li>

                <li>Confirm diagnosis using laboratory investigations.</li>

                <li>Discuss treatment options with your physician.</li>

                <li>Monitor menstrual cycle regularly.</li>

                <li>Maintain a healthy body weight.</li>

                <li>Follow a balanced low-glycemic diet.</li>

                <li>Exercise at least 30–45 minutes daily.</li>

              </ul>

            </>

          ) : (

            <>

              <h4 style={{ color: "#16a34a" }}>

                Continue Healthy Lifestyle

              </h4>

              <ul>

                <li>Maintain regular physical activity.</li>

                <li>Eat a balanced nutritious diet.</li>

                <li>Drink sufficient water every day.</li>

                <li>Sleep for 7–8 hours daily.</li>

                <li>Continue routine health check-ups.</li>

                <li>Consult a doctor if symptoms appear later.</li>

              </ul>

            </>

          )}

        </div>

      </div>

      {/* ================= PERSONALIZED AI ADVICE ================= */}

      <div className="report-section">

        <h3>Personalized AI Advice</h3>

        <div className="advice-box">

          {result.prediction === "PCOS Positive" ? (

            <>

              <p>

                Based on the multimodal analysis, lifestyle
                modification should begin as early as possible.

              </p>

              <p>

                Regular exercise, weight management, stress
                reduction, and adherence to medical advice
                can significantly improve long-term health
                outcomes.

              </p>

            </>

          ) : (

            <>

              <p>

                Your current screening results appear normal.

              </p>

              <p>

                Continue following healthy dietary habits,
                exercise regularly, and monitor menstrual
                health to reduce future risk.

              </p>

            </>

          )}

        </div>

      </div>
            {/* ================= FOLLOW-UP TESTS ================= */}

      <div className="report-section">

        <h3>Recommended Follow-up Medical Tests</h3>

        <div className="recommendation-box">

          {result.prediction === "PCOS Positive" ? (

            <ul>

              <li>🩺 Pelvic Ultrasound Examination</li>

              <li>🧪 LH & FSH Hormone Profile</li>

              <li>🧪 Anti-Müllerian Hormone (AMH)</li>

              <li>🧪 Thyroid Profile (TSH)</li>

              <li>🧪 Prolactin (PRL)</li>

              <li>🧪 Fasting Blood Sugar / HbA1c</li>

              <li>🧪 Lipid Profile</li>

              <li>🧪 Vitamin D Assessment</li>

              <li>🩺 Consultation with Gynecologist</li>

            </ul>

          ) : (

            <ul>

              <li>✔ Routine Annual Health Check-up</li>

              <li>✔ Blood Sugar Monitoring</li>

              <li>✔ Complete Blood Count (CBC)</li>

              <li>✔ Routine Gynecological Examination</li>

              <li>✔ Maintain Regular Screening</li>

            </ul>

          )}

        </div>

      </div>

      {/* ================= MEDICAL DISCLAIMER ================= */}

      <div className="report-section">

        <h3>Medical Disclaimer</h3>

        <div className="disclaimer-box">

          <p>

            This report has been generated using the
            <strong> PCOSense-AI Multimodal Screening System </strong>
            based on clinical parameters and ultrasound image
            analysis.

          </p>

          <p>

            The prediction is intended for
            <strong> screening and educational purposes only </strong>
            and should not be considered a confirmed medical
            diagnosis.

          </p>

          <p>

            Please consult a qualified Gynecologist or Healthcare
            Professional before making any medical decisions.

          </p>

        </div>

      </div>

      {/* ================= AI LIMITATIONS ================= */}

      <div className="report-section">

        <h3>AI System Limitations</h3>

        <div className="recommendation-box">

          <ul>

            <li>AI predictions depend on the quality of the uploaded ultrasound image.</li>

            <li>Incorrect clinical information may affect prediction accuracy.</li>

            <li>This AI system assists healthcare professionals but does not replace clinical diagnosis.</li>

            <li>Medical examination and laboratory investigations remain essential.</li>

          </ul>

        </div>

      </div>

      {/* ================= REPORT FOOTER ================= */}

      <div className="report-footer">

        <hr />

        <h2>PCOSense-AI</h2>

        <p>

          AI Powered Multimodal PCOS Detection Platform

        </p>

        <p>

          Department of Computer Science & Engineering

        </p>

        <p>

          B.Tech Final Year Major Project

        </p>

        <p>

          Generated on {reportDate} at {reportTime}

        </p>

      </div>

      {/* ================= ACTION BUTTONS ================= */}

      <div className="report-buttons">

        <button
          className="print-btn"
          onClick={() => window.print()}
        >

          🖨 Print Report

        </button>

        <button
          className="download-btn"
          onClick={downloadReportPDF}
        >

          📄 Download PDF

        </button>

      </div>

    </div>

  );

};

export default Report;
