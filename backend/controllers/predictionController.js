import Prediction from "../models/Prediction.js";
import { getPrediction } from "../services/modelService.js";

// export const createPrediction = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image provided' });
//     }

//     console.log('File received:', {
//       originalname: req.file.originalname,
//       mimetype: req.file.mimetype,
//       size: req.file.size
//     });

//     const modelResult = await getPrediction(req.file);

//     const prediction = new Prediction({
//       userId: req.userId,
//       prediction: modelResult.prediction,
//       confidence: modelResult.confidence,
//       imageUrl: '' // Implement image storage if needed
//     });

//     await prediction.save();

//     res.status(201).json(modelResult);
//   } catch (error) {
//     console.error('Prediction Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// };

export const createPrediction = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    console.log("File received:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      buffer: req.file.buffer ? "Buffer present" : "No buffer",
    });

    const modelResult = await getPrediction(req.file);

    console.log("Model Result:", modelResult);

    const prediction = new Prediction({
      userId: req.userId,
      prediction: modelResult.prediction,
      confidence: modelResult.confidence,
      imageUrl: "", // Implement image storage if needed
    });

    await prediction.save();
    res.status(201).json(modelResult);
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getUserPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
