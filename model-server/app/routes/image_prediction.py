import io
import numpy as np
import logging
from flask import Blueprint, request, jsonify
from PIL import Image
from app.models.load_image_model import load_image_model

# Configure logging
logger = logging.getLogger(__name__)

# Create Blueprint
mri_prediction_bp = Blueprint("mri_prediction", __name__, url_prefix="/api/predict")

# Load model
image_model = load_image_model()


def preprocess_image(image_bytes):
    """Preprocess image for model prediction."""
    try:
        img = Image.open(io.BytesIO(image_bytes))
        img = img.convert("RGB")
        img = img.resize((128, 128))
        x = np.array(img).astype("float32") / 255.0  # Normalize pixel values
        x = np.expand_dims(x, axis=0)  # Add batch dimension
        return x
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        raise


@mri_prediction_bp.route("/mri", methods=["POST"])
def predict_image():
    """Image classification endpoint."""
    logger.info("Received image classification request")

    try:
        # Validate request
        if "image" not in request.files:
            logger.warning("No image file in request")
            return jsonify({"error": "No image provided"}), 400

        file = request.files["image"]
        if file.filename == "":
            logger.warning("Empty filename received")
            return jsonify({"error": "No image provided"}), 400

        logger.info(f"Processing file: {file.filename}")

        # Read and preprocess image
        image_bytes = file.read()
        processed_image = preprocess_image(image_bytes)

        # Make prediction
        prediction = image_model.predict(processed_image)
        class_idx = np.argmax(prediction, axis=1)[0]
        confidence = float(prediction[0][class_idx] * 100)

        # Define classes
        classes = [
            "Non Demented",
            "Mild Dementia",
            "Moderate Dementia",
            "Very Mild Dementia",
        ]

        result = {
            "prediction": classes[class_idx],
            "confidence": round(confidence, 2),
            "status": "success",
            "raw_predictions": {
                "Non Demented": float(prediction[0][0] * 100),
                "Mild Dementia": float(prediction[0][1] * 100),
                "Moderate Dementia": float(prediction[0][2] * 100),
                "Very Mild Dementia": float(prediction[0][3] * 100),
            },
        }

        logger.info(f"Prediction result: {result}")
        return jsonify(result)

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e), "status": "error"}), 500
