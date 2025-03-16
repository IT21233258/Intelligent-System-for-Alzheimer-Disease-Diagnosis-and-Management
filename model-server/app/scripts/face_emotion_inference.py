import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

# Load Model
model_path = "./backend/models/face_emotion_model.h5"  # Adjust path as necessary
model = tf.keras.models.load_model(model_path)

# Emotion Mapping
emotion_labels = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"]


# Inference Function
def predict_face_emotion(image_path):
    img = load_img(
        image_path, target_size=(48, 48), color_mode="grayscale"
    )  # Grayscale for compatibility
    img_array = img_to_array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

    prediction = model.predict(img_array)
    emotion = emotion_labels[np.argmax(prediction)]
    return emotion


# Example
if __name__ == "__main__":
    image_path = "test_image.jpg"  # Replace with a valid test image path
    emotion = predict_face_emotion(image_path)
    print(f"Predicted Emotion: {emotion}")
