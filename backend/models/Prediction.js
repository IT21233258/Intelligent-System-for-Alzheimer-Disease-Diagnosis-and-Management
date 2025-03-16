import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  prediction: String,
  confidence: Number,
  imageUrl: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Prediction', predictionSchema);