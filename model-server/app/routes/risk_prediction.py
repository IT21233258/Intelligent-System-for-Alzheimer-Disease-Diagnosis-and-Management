import json
from flask import Blueprint, request, jsonify
import pandas as pd
from app.models.load_risk_models import load_models

# Create Blueprint
risk_prediction_bp = Blueprint("prediction", __name__, url_prefix="/api/predict")

# Load models once
models, scaler = load_models()


def analyze_risk(input_df, model_type):
    try:
        # Check model type and predict
        if model_type == "xgb":
            probabilities = models[model_type].predict_proba(input_df)[:, 1]
        elif model_type == "catboost":
            probabilities = models[model_type].predict_proba(input_df)[:, 1]
        else:
            probabilities = models[model_type].predict_proba(input_df)[:, 1]

        # Predict class 1 (Alzheimer's) based on threshold 0.5
        prediction = int(probabilities[0] >= 0.5)  # Thresholding at 0.5
        confidence = round(float(probabilities[0]), 4)  # Convert to float and round

        return prediction, confidence

    except Exception as e:
        raise Exception(f"Error during prediction: {str(e)}")


def predict_from_json(json_input, model_type="all"):
    predictions_list = []

    # Process the single JSON input
    input_data = pd.DataFrame([json_input])  # Convert JSON to DataFrame
    input_data_scaled = scaler.transform(
        input_data
    )  # Apply the same preprocessing (scaling)

    predictions = {}

    if model_type == "all":
        # Loop through all models if "all" is passed
        for name, model in models.items():
            try:
                prediction, confidence = analyze_risk(input_data_scaled, name)
                predictions[name] = {
                    "Prediction": int(prediction),
                    "Confidence": round(confidence * 100, 2),
                    "Interpretation": (
                        "Alzheimer's detected"
                        if prediction
                        else "No Alzheimer's detected"
                    ),
                }
            except Exception as e:
                predictions[name] = {"Error": str(e)}
    else:
        # Predict with a specific model
        try:
            prediction, confidence = analyze_risk(input_data_scaled, model_type)
            predictions[model_type] = {
                "Prediction": int(prediction),
                "Confidence": round(confidence * 100, 2),
                "Interpretation": (
                    "Alzheimer's detected" if prediction else "No Alzheimer's detected"
                ),
            }
        except Exception as e:
            predictions[model_type] = {"Error": str(e)}

    predictions_list.append({"Sample": 1, "Predictions": predictions})

    return predictions_list


# Define routes
@risk_prediction_bp.route("/risk", methods=["POST"])
def predict():
    try:
        # Get the single JSON input
        json_input = request.get_json()

        # Check if input is a single JSON object
        if not isinstance(json_input, dict):
            return jsonify({"error": "Input should be a single JSON object."}), 400

        # Get predictions for the single input using all models
        predictions_list = predict_from_json(json_input, model_type="all")

        return jsonify(predictions_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@risk_prediction_bp.route("/risk/<model_type>", methods=["POST"])
def predict_with_model(model_type):
    try:
        # Check if the model type is valid
        if model_type not in models:
            return jsonify({"error": "Invalid model type."}), 400

        # Get the single JSON input
        json_input = request.get_json()

        # Check if input is a single JSON object
        if not isinstance(json_input, dict):
            return jsonify({"error": "Input should be a single JSON object."}), 400

        # Get predictions for the single input using the selected model
        predictions_list = predict_from_json(json_input, model_type)

        return jsonify(predictions_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 400
