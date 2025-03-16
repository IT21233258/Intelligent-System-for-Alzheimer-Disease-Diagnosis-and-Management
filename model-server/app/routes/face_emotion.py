from flask import Blueprint, request, jsonify
from app.utils.face_emotion_utils import predict_face_emotion
from PIL import Image

# from firebase_config import db  # Import the Firestore database

face_emotion_bp = Blueprint("face_emotion", __name__)


@face_emotion_bp.route("/predict_face_emotion", methods=["POST"])
def predict_face():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image = request.files["image"]
    image_path = "temp_image.jpg"
    image.save(image_path)

    emotion = predict_face_emotion(image_path)

    # # Save to Firebase Firestore
    # db.collection('face_emotions').add({
    #     'emotion': emotion,
    #     'image_path': image_path
    # })

    return jsonify({"emotion": emotion})
