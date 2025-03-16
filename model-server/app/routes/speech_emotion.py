from flask import Blueprint, request, jsonify
from app.utils.speech_emotion_utils import predict_speech_emotion

# from firebase_config import db  # Import Firestore database

speech_emotion_bp = Blueprint("speech_emotion", __name__)


@speech_emotion_bp.route("/predict_speech_emotion", methods=["POST"])
def predict_speech():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio = request.files["audio"]
    audio_path = "temp_audio.wav"
    audio.save(audio_path)

    emotion = predict_speech_emotion(audio_path)

    # # Save to Firebase Firestore
    # db.collection('speech_emotions').add({
    #     'emotion': emotion,
    #     'audio_path': audio_path
    # })

    return jsonify({"emotion": emotion})
