from flask import Blueprint, request, jsonify
import pandas as pd
import traceback

from utils.model_loader import model_loader

# =====================================================
# Blueprint
# =====================================================

clinical_bp = Blueprint("clinical", __name__)


# =====================================================
# Clinical Prediction Route
# =====================================================

@clinical_bp.route("/predict-clinical", methods=["POST"])
def predict_clinical():

    try:

        data = request.get_json()

        # ------------------------------------------------
        # Build DataFrame (ALL 41 FEATURES)
        # ------------------------------------------------

        df = pd.DataFrame([{

            "Age (yrs)": float(data["age"]),
            "Weight (Kg)": float(data["weight"]),
            "Height(Cm)": float(data["height"]),
            "BMI": float(data["bmi"]),
            "Blood Group": int(data["bloodGroup"]),
            "Pulse rate(bpm)": float(data["pulseRate"]),
            "RR (breaths/min)": float(data["rr"]),
            "Hb(g/dl)": float(data["hb"]),
            "Cycle(R/I)": int(data["cycle"]),
            "Cycle length(days)": float(data["cycleLength"]),
            "Marraige Status (Yrs)": float(data["marriageYears"]),
            "Pregnant(Y/N)": int(data["pregnant"]),
            "No. of aborptions": float(data["abortions"]),
            "I   beta-HCG(mIU/mL)": float(data["betaHCG1"]),
            "II    beta-HCG(mIU/mL)": float(data["betaHCG2"]),
            "FSH(mIU/mL)": float(data["fsh"]),
            "LH(mIU/mL)": float(data["lh"]),
            "FSH/LH": float(data["fshlh"]),
            "Hip(inch)": float(data["hip"]),
            "Waist(inch)": float(data["waist"]),
            "Waist:Hip Ratio": float(data["waistHipRatio"]),
            "TSH (mIU/L)": float(data["tsh"]),
            "AMH(ng/mL)": float(data["amh"]),
            "PRL(ng/mL)": float(data["prl"]),
            "Vit D3 (ng/mL)": float(data["vitaminD3"]),
            "PRG(ng/mL)": float(data["progesterone"]),
            "RBS(mg/dl)": float(data["rbs"]),
            "Weight gain(Y/N)": int(data["weightGain"]),
            "hair growth(Y/N)": int(data["hairGrowth"]),
            "Skin darkening (Y/N)": int(data["skinDarkening"]),
            "Hair loss(Y/N)": int(data["hairLoss"]),
            "Pimples(Y/N)": int(data["pimples"]),
            "Fast food (Y/N)": int(data["fastFood"]),
            "Reg.Exercise(Y/N)": int(data["exercise"]),
            "BP _Systolic (mmHg)": float(data["bpSystolic"]),
            "BP _Diastolic (mmHg)": float(data["bpDiastolic"]),
            "Follicle No. (L)": float(data["follicleLeft"]),
            "Follicle No. (R)": float(data["follicleRight"]),
            "Avg. F size (L) (mm)": float(data["follicleSizeLeft"]),
            "Avg. F size (R) (mm)": float(data["follicleSizeRight"]),
            "Endometrium (mm)": float(data["endometrium"])

        }])

        # ------------------------------------------------
        # Scale ALL 41 Features
        # ------------------------------------------------

        scaled = model_loader.scaler.transform(df)

        scaled_df = pd.DataFrame(
            scaled,
            columns=df.columns
        )

        # ------------------------------------------------
        # Select RFE Features
        # ------------------------------------------------

        final_input = scaled_df[
            model_loader.selected_features
        ]

        # ------------------------------------------------
        # Prediction
        # ------------------------------------------------

        prediction = model_loader.clinical_model.predict(
            final_input
        )[0]

        # ------------------------------------------------
        # Confidence
        # ------------------------------------------------

        if hasattr(model_loader.clinical_model, "predict_proba"):

            confidence = float(

                model_loader.clinical_model.predict_proba(
                    final_input
                )[0][1]

            )

        else:

            confidence = 0.95

        # ------------------------------------------------
        # Response
        # ------------------------------------------------

        return jsonify({

            "prediction":

                "PCOS Positive"

                if prediction == 1

                else

                "PCOS Negative",

            "confidence": round(confidence * 100, 2)

        })

    except Exception as e:

        traceback.print_exc()

        return jsonify({

            "error": str(e)

        }), 500