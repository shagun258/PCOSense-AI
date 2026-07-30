import os
import json
import joblib
from tensorflow.keras.models import load_model

# Base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Models folder
MODELS_DIR = os.path.join(BASE_DIR, "models")

# File paths
CLINICAL_MODEL_PATH = os.path.join(MODELS_DIR, "clinical_model.pkl")
SCALER_PATH = os.path.join(MODELS_DIR, "scaler.pkl")
FEATURES_PATH = os.path.join(MODELS_DIR, "selected_features.json")
CONFIG_PATH = os.path.join(MODELS_DIR, "config.json")
IMAGE_MODEL_PATH = os.path.join(MODELS_DIR, "ResNet50_Finetuned.keras")


class ModelLoader:
    def __init__(self):
        self.clinical_model = None
        self.scaler = None
        self.selected_features = None
        self.config = None
        self.image_model = None

    def load_models(self):
        print("Loading AI models...")

        # Clinical model
        self.clinical_model = joblib.load(CLINICAL_MODEL_PATH)
        print("✓ Clinical model loaded")

        # Scaler
        self.scaler = joblib.load(SCALER_PATH)
        print("✓ Scaler loaded")

        # Selected features
        with open(FEATURES_PATH, "r") as f:
            self.selected_features = json.load(f)
        print("✓ Selected features loaded")

        # Config
        with open(CONFIG_PATH, "r") as f:
            self.config = json.load(f)
        print("✓ Config loaded")

        # Ultrasound model
        self.image_model = load_model(IMAGE_MODEL_PATH)
        print("✓ ResNet50 model loaded")

        print("\nAll AI models loaded successfully!\n")


# Global loader instance
model_loader = ModelLoader()