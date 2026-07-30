from flask import Blueprint, request, jsonify
from PIL import Image
import numpy as np
import pandas as pd

from utils.model_loader import model_loader

multimodal_bp = Blueprint("multimodal", __name__)


@multimodal_bp.route("/predict-multimodal", methods=["POST"])
def predict_multimodal():

    try:

        # ============================================
        # Check Image
        # ============================================

        if "image" not in request.files:

            return jsonify({
                "error": "Please upload an ultrasound image."
            }), 400

        image_file = request.files["image"]

        # ============================================
        # Clinical Data
        # ============================================

        clinical_data = request.form.to_dict()

        # ============================================
        # Build DataFrame with ALL 41 Features
        # ============================================

        df = pd.DataFrame([{

            "Age (yrs)": float(clinical_data.get("age",0)),
            "Weight (Kg)": float(clinical_data.get("weight",0)),
            "Height(Cm)": float(clinical_data.get("height",0)),
            "BMI": float(clinical_data.get("bmi",0)),
            "Blood Group": int(clinical_data.get("bloodGroup",0)),
            "Pulse rate(bpm)": float(clinical_data.get("pulseRate",0)),
            "RR (breaths/min)": float(clinical_data.get("rr",0)),
            "Hb(g/dl)": float(clinical_data.get("hb",0)),
            "Cycle(R/I)": int(clinical_data.get("cycle",0)),
            "Cycle length(days)": float(clinical_data.get("cycleLength",0)),
            "Marraige Status (Yrs)": float(clinical_data.get("marriageYears",0)),
            "Pregnant(Y/N)": int(clinical_data.get("pregnant",0)),
            "No. of aborptions": float(clinical_data.get("abortions",0)),
            "I   beta-HCG(mIU/mL)": float(clinical_data.get("betaHCG1",0)),
            "II    beta-HCG(mIU/mL)": float(clinical_data.get("betaHCG2",0)),
            "FSH(mIU/mL)": float(clinical_data.get("fsh",0)),
            "LH(mIU/mL)": float(clinical_data.get("lh",0)),
            "FSH/LH": float(clinical_data.get("fshlh",0)),
            "Hip(inch)": float(clinical_data.get("hip",0)),
            "Waist(inch)": float(clinical_data.get("waist",0)),
            "Waist:Hip Ratio": float(clinical_data.get("waistHipRatio",0)),
            "TSH (mIU/L)": float(clinical_data.get("tsh",0)),
            "AMH(ng/mL)": float(clinical_data.get("amh",0)),
            "PRL(ng/mL)": float(clinical_data.get("prl",0)),
            "Vit D3 (ng/mL)": float(clinical_data.get("vitaminD3",0)),
            "PRG(ng/mL)": float(clinical_data.get("progesterone",0)),
            "RBS(mg/dl)": float(clinical_data.get("rbs",0)),
            "Weight gain(Y/N)": int(clinical_data.get("weightGain",0)),
            "hair growth(Y/N)": int(clinical_data.get("hairGrowth",0)),
            "Skin darkening (Y/N)": int(clinical_data.get("skinDarkening",0)),
            "Hair loss(Y/N)": int(clinical_data.get("hairLoss",0)),
            "Pimples(Y/N)": int(clinical_data.get("pimples",0)),
            "Fast food (Y/N)": int(clinical_data.get("fastFood",0)),
            "Reg.Exercise(Y/N)": int(clinical_data.get("exercise",0)),
            "BP _Systolic (mmHg)": float(clinical_data.get("bpSystolic",0)),
            "BP _Diastolic (mmHg)": float(clinical_data.get("bpDiastolic",0)),
            "Follicle No. (L)": float(clinical_data.get("follicleLeft",0)),
            "Follicle No. (R)": float(clinical_data.get("follicleRight",0)),
            "Avg. F size (L) (mm)": float(clinical_data.get("follicleSizeLeft",0)),
            "Avg. F size (R) (mm)": float(clinical_data.get("follicleSizeRight",0)),
            "Endometrium (mm)": float(clinical_data.get("endometrium",0))

        }])

        # ============================================
        # Scale ALL 41 Features
        # ============================================

        scaled = model_loader.scaler.transform(df)

        scaled_df = pd.DataFrame(
            scaled,
            columns=df.columns
        )

        # ============================================
        # Keep Selected Features
        # ============================================

        final_input = scaled_df[
            model_loader.selected_features
        ]

        # ============================================
        # Clinical Probability
        # ============================================

        clinical_prob = float(
            model_loader.clinical_model.predict_proba(
                final_input
            )[0][1]
        )

        # ============================================
        # Ultrasound Preprocessing
        # ============================================

        image = Image.open(image_file).convert("RGB")
        image = image.resize((224,224))
        image = np.array(image)
        image = image.astype(np.float32) / 255.0
        image = np.expand_dims(image, axis=0)

        # ============================================
        # Ultrasound Prediction
        # ============================================

        ultrasound_prob = float(
            model_loader.image_model.predict(
                image,
                verbose=0
            )[0][0]
        )

        # ============================================
        # Decision Fusion
        # ============================================

        cw = model_loader.config["clinical_weight"]
        iw = model_loader.config["image_weight"]

        final_prob = (clinical_prob * cw) + (ultrasound_prob * iw)

        diagnosis = (
            "PCOS Positive"
            if final_prob >= 0.5
            else "PCOS Negative"
        )

        return jsonify({

            "prediction": diagnosis,
            "clinical_confidence": round(clinical_prob * 100, 2),
            "ultrasound_confidence": round(ultrasound_prob * 100, 2),
            "final_confidence": round(final_prob * 100, 2)

        })

    except Exception as e:

        import traceback
        traceback.print_exc()

        return jsonify({
            "error": str(e)
        }), 500