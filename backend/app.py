from flask import Flask
from flask_cors import CORS

# =====================================================
# Load AI Models
# =====================================================

from utils.model_loader import model_loader

# =====================================================
# Import Routes
# =====================================================

from routes.Clinical import clinical_bp
from routes.Ultrasound import ultrasound_bp
from routes.Multimodal import multimodal_bp

# =====================================================
# Flask App
# =====================================================

app = Flask(__name__)

CORS(app)

# =====================================================
# Load Models Once
# =====================================================

print("=" * 60)
print("Loading PCOSense-AI Models...")
print("=" * 60)

model_loader.load_models()

print("=" * 60)
print("Backend Ready")
print("=" * 60)

# =====================================================
# Register Routes
# =====================================================

app.register_blueprint(clinical_bp)

app.register_blueprint(ultrasound_bp)

app.register_blueprint(multimodal_bp)

# =====================================================
# Home Route
# =====================================================

@app.route("/")
def home():

    return {

        "message": "Welcome to PCOSense-AI Backend",

        "status": "Running Successfully",

        "clinical_model": model_loader.clinical_model is not None,

        "ultrasound_model": model_loader.image_model is not None,

        "multimodal_route": True

    }

# =====================================================
# Health Check
# =====================================================

@app.route("/health")
def health():

    return {

        "backend": "Running",

        "clinical_model": model_loader.clinical_model is not None,

        "scaler": model_loader.scaler is not None,

        "selected_features": model_loader.selected_features is not None,

        "image_model": model_loader.image_model is not None,

        "multimodal_route": True

    }

# =====================================================
# Run Server
# =====================================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )