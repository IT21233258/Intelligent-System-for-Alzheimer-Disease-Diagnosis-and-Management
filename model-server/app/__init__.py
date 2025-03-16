from flask import Flask
from app.routes.risk_prediction import risk_prediction_bp
from app.routes.image_prediction import mri_prediction_bp

from app.routes.face_emotion import face_emotion_bp
from app.routes.speech_emotion import speech_emotion_bp
from app.routes.response_system import response_bp


def create_app():
    app = Flask(__name__)

    app.register_blueprint(risk_prediction_bp)
    app.register_blueprint(mri_prediction_bp)

    app.register_blueprint(face_emotion_bp, url_prefix="/api/face")
    app.register_blueprint(speech_emotion_bp, url_prefix="/api/speech")
    app.register_blueprint(response_bp, url_prefix="/api/response_system")

    return app
