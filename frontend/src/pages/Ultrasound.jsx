import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaUpload,
    FaHeartbeat,
    FaImage
} from "react-icons/fa";

import "../styles/Ultrasound.css";

function Ultrasound() {

    const [selectedImage, setSelectedImage] = useState(null);

    const [preview, setPreview] = useState(null);

    const [prediction, setPrediction] = useState(null);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
        const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setSelectedImage(file);

        setPreview(URL.createObjectURL(file));

        setPrediction(null);

        setError("");

    };

    const handleSubmit = async () => {

        if (!selectedImage) {

            setError("Please select an ultrasound image.");

            return;

        }

        setLoading(true);

        setPrediction(null);

        setError("");

        try {

            const formData = new FormData();

            formData.append("image", selectedImage);

            const response = await fetch(
                "http://127.0.0.1:5000/predict-ultrasound",
                {
                    method: "POST",
                    body: formData
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

        <div className="ultrasound-container">

            <Link to="/home" className="back-btn">

                <FaArrowLeft />

                Back

            </Link>

            <h1 className="page-title">

                <FaHeartbeat />

                Ultrasound PCOS Detection

            </h1>

            <p className="page-subtitle">

                Upload an ovarian ultrasound image and let the AI model
                predict the possibility of PCOS.

            </p>

            <div className="upload-card">

                <div className="upload-box">

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

                            <>

                                <FaImage className="upload-icon" />

                                <p>No Image Selected</p>

                            </>

                        )

                    }

                </div>

                <label className="upload-btn">

                    <FaUpload />

                    Choose Image

                    <input

                        type="file"

                        accept="image/*"

                        hidden

                        onChange={handleImageChange}

                    />

                </label>

                {

                    selectedImage &&

                    <p className="filename">

                        {selectedImage.name}

                    </p>

                }

                <button

                    className="predict-btn"

                    disabled={!selectedImage || loading}

                    onClick={handleSubmit}

                >

                    {

                        loading

                        ?

                        "Predicting..."

                        :

                        "Predict PCOS"

                    }

                </button>
                                {

                    prediction &&

                    <div className="result-card">

                        <h2>

                            Prediction Result

                        </h2>

                        <h1

                            className={

                                prediction.prediction === "PCOS Positive"

                                ?

                                "positive"

                                :

                                "negative"

                            }

                        >

                            {prediction.prediction}

                        </h1>

                        <h3>

                            Confidence : {prediction.confidence}%

                        </h3>

                    </div>

                }

                {

                    error &&

                    <div className="error-card">

                        {error}

                    </div>

                }

            </div>
                    </div>

    );

}

export default Ultrasound;