from flask import Blueprint, request, jsonify
from app.utils.response_utils import generate_response_from_llm, save_response

response_bp = Blueprint("response_system", __name__)


@response_bp.route("/generate_response", methods=["POST"])
def generate_response_for_caregiver():
    emotion = request.json.get("emotion")
    patient_history = request.json.get(
        "patient_history", None
    )  # Optional: pass patient's emotional history if available

    if not emotion:
        return jsonify({"error": "No emotion provided"}), 400

    # Generate response using the LLM based on the emotion and patient history
    response = generate_response_from_llm(emotion, patient_history)

    # Save the response to Firestore for caregiver review
    save_response(emotion, response)

    return jsonify({"response": response})
