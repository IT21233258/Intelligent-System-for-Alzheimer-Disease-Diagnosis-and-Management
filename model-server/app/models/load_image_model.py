import os
import logging
from tensorflow.keras.models import load_model

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load the image classification model
MODEL_PATH = os.path.join(current_dir, "mri", "alzheimers_model.h5")


def load_image_model():
    """Load the TensorFlow model for image classification."""
    try:
        model = load_model(MODEL_PATH)
        logger.info("Image classification model loaded successfully")
        return model
    except Exception as e:
        logger.error(f"Error loading image model: {str(e)}")
        raise
