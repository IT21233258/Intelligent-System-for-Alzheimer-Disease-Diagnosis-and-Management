import axios from "axios";
import { AnalysisResult, ApiResponse } from "@/types";

export const apiService = {
  // Authenticated MRI scan upload
  async uploadMriScan(
    file: File,
    token: string
  ): Promise<ApiResponse<AnalysisResult>> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions`;
      console.log("Making MRI upload request to:", url);

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      // Format the response to match our AnalysisResult type
      const result: AnalysisResult = {
        prediction: response.data.confidence,
        confidence: response.data.prediction,
        raw_predictions: response.data.raw_predictions,
        status: response.data.status,
        // details: {
        //   regions: response.data.regionAnalysis || [
        //     {
        //       name: "Hippocampus",
        //       status:
        //         response.data.result === "Non Demented" ? "Normal" : "Abnormal",
        //       score: response.data.probability,
        //     },
        //     {
        //       name: "Ventricles",
        //       status:
        //         response.data.result === "Non Demented" ? "Normal" : "Enlarged",
        //       score: response.data.probability * 0.9,
        //     },
        //     {
        //       name: "Cortical Thickness",
        //       status:
        //         response.data.result === "Non Demented" ? "Normal" : "Reduced",
        //       score: response.data.probability * 1.1,
        //     },
        //   ],
        //   notes:
        //     response.data.notes ||
        //     `Analysis shows ${
        //       response.data.result === "Non Demented"
        //         ? "no significant"
        //         : "some"
        //     } patterns consistent with Alzheimer's disease.`,
        //   recommendations:
        //     response.data.recommendations ||
        //     "Please consult with a healthcare professional for a complete evaluation.",
        // },
        // id: response.data.id,
        // timestamp: response.data.timestamp,
      };

      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error("Error uploading MRI scan:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
  },

  // Public MRI analysis without authentication
  async analyzeMriPublic(file: File): Promise<ApiResponse<AnalysisResult>> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions/public-analyze`;
      console.log("Making public MRI analysis request to:", url);

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Format the response to match our AnalysisResult type
      const result: AnalysisResult = {
        prediction: response.data.confidence,
        confidence: response.data.prediction,
        raw_predictions: response.data.raw_predictions,
        status: response.data.status,
      };

      return {
        success: true,
        data: result,
      };
    } catch (error: any) {
      console.error("Error analyzing MRI scan:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
  },

  // Save results (requires authentication)
  async saveResults(
    results: AnalysisResult,
    token: string
  ): Promise<ApiResponse<void>> {
    try {
      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions/save`;
      console.log("Saving results to:", url);

      const response = await axios.post(
        url,
        {
          predictionId: results.id,
          details: results.details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Save response:", response.data);

      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Error saving results:", error);
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.message ||
          "An error occurred while saving",
      };
    }
  },

  // Get prediction history (requires authentication)
  async getPredictionHistory(
    token: string
  ): Promise<ApiResponse<AnalysisResult[]>> {
    try {
      // Log the URL to debug
      const url = `${process.env.NEXT_PUBLIC_API_URL}/predictions/history`;
      console.log("Fetching history from:", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Transform the API response to match our frontend types
      const predictions = response.data.predictions.map((prediction: any) => ({
        prediction: prediction.result,
        confidence: `${(prediction.probability * 100).toFixed(1)}%`,
        details: prediction.details || {
          regions: [],
          notes: "No detailed analysis available",
          recommendations: "No recommendations available",
        },
        id: prediction._id,
        timestamp: prediction.createdAt,
      }));

      return {
        success: true,
        data: predictions,
      };
    } catch (error: any) {
      console.error("Error fetching prediction history:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || error.message || "An error occurred",
      };
    }
  },
};
