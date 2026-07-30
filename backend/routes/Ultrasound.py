from flask import Blueprint, request, jsonify
from PIL import Image
import numpy as np

from utils.model_loader import model_loader

ultrasound_bp = Blueprint("ultrasound", __name__)


@ultrasound_bp.route("/predict-ultrasound", methods=["POST"])
def predict_ultrasound():

    try:

        # -----------------------------
        # Check if image exists
        # -----------------------------

        if "image" not in request.files:

            return jsonify({
                "error": "No image uploaded."
            }), 400

        file = request.files["image"]

        if file.filename == "":

            return jsonify({
                "error": "Please select an image."
            }), 400

        # -----------------------------
        # Image Preprocessing
        # -----------------------------

        image = Image.open(file).convert("RGB")

        image = image.resize((224, 224))

        image = np.array(image).astype("float32")

        image = image / 255.0

        image = np.expand_dims(image, axis=0)

        # -----------------------------
        # Model Prediction
        # -----------------------------

        probability = float(
            model_loader.image_model.predict(image, verbose=0)[0][0]
        )

        prediction = (
            "PCOS Positive"
            if probability >= 0.5
            else "PCOS Negative"
        )

        confidence = (
            probability
            if probability >= 0.5
            else 1 - probability
        )

        return jsonify({

            "prediction": prediction,

            "confidence": round(confidence * 100, 2)

        })

    except Exception as e:

        import traceback

        traceback.print_exc()

        return jsonify({

            "error": str(e)

        }), 500