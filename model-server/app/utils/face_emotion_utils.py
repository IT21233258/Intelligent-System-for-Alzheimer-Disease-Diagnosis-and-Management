import os
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

# Load your model (ensure the model is designed to handle RGB images)

model_path = os.path.join(os.getcwd(), "app/models/emotion/face_emotion_model.h5")
model = load_model(model_path)


# Emotion Mapping
emotion_labels = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]


def predict_face_emotion(image_path):
    img = load_img(image_path, color_mode="grayscale", target_size=(48, 48))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    print(f"Raw model prediction: {prediction}")  # Debug statement

    emotion = emotion_labels[np.argmax(prediction)]
    print(f"Predicted emotion: {emotion}")  # Debug statement
    return emotion
