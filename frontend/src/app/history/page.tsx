// src/app/history/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import { Prediction } from "@/types";

export default function History() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/predictions/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch predictions");
        }

        setPredictions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchPredictions();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  // For demonstration purposes, adding mock data
  useEffect(() => {
    if (!token) return;

    // Mock data - remove in production
    const mockPredictions: Prediction[] = [
      {
        _id: "1",
        userId: "user123",
        prediction: "Non Demented",
        confidence: 92.5,
        createdAt: "2025-03-08T10:30:00Z",
      },
      {
        _id: "2",
        userId: "user123",
        prediction: "Demented",
        confidence: 87.3,
        createdAt: "2025-03-06T15:20:00Z",
      },
      {
        _id: "3",
        userId: "user123",
        prediction: "Non Demented",
        confidence: 91.8,
        createdAt: "2025-03-02T09:15:00Z",
      },
      {
        _id: "4",
        userId: "user123",
        prediction: "Non Demented",
        confidence: 89.4,
        createdAt: "2025-02-28T14:45:00Z",
      },
      {
        _id: "5",
        userId: "user123",
        prediction: "Demented",
        confidence: 85.2,
        createdAt: "2025-02-22T11:10:00Z",
      },
    ];

    setPredictions(mockPredictions);
    setIsLoading(false);
  }, [token]);

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Prediction History</h1>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          ) : predictions.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">
                No predictions found. Make a prediction first.
              </p>
              <button
                onClick={() => (window.location.href = "/mri-detection")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Make a Prediction
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Prediction
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Confidence
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictions.map((prediction) => (
                    <tr key={prediction._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(prediction.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            prediction.prediction === "Non Demented"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {prediction.prediction}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prediction.confidence.toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
