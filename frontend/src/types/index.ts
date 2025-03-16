// src/types/index.ts

export interface Region {
  name: string;
  status: string;
  score: number;
}

export interface AnalysisDetails {
  regions: Region[];
  notes: string;
  recommendations: string;
}

export interface RawPredictions {
  [key: string]: number;
}

export interface AnalysisResult {
  prediction: string;
  confidence: number;
  raw_predictions: RawPredictions;
  status: string;
  id?: string;
  timestamp?: string;
  details?: AnalysisDetails;
}

export interface Prediction {
  _id: string;
  userId: string;
  prediction: string;
  confidence: number;
  imageUrl?: string;
  createdAt: string;
  details?: AnalysisDetails; // Added to match AnalysisResult structure
  updatedAt?: string;
}

export interface PredictionResult {
  prediction: string;
  confidence: string;
  id?: string;
  timestamp?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

// Additional types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PredictionHistoryResponse {
  predictions: Prediction[];
}
