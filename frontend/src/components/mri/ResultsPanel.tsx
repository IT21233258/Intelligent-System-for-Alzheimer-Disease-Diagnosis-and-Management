// src/components/mri/ResultsPanel.tsx
import Button from '@/components/ui/Button';
import { AnalysisResult } from '@/types';

interface ResultsPanelProps {
  results: AnalysisResult;
  onReset: () => void;
  onSaveResults: () => void;
  onPrintReport: () => void;
}

// Function to generate a random status
const getRandomStatus = () => {
  const statuses = [
    'Normal', 
    'Abnormal', 
    'Atrophy Detected', 
    'Mild Changes', 
    'Significant Changes',
    'Enlarged',
    'Reduced Volume'
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Function to generate a random score between 0 and 100
const getRandomScore = () => {
  return Math.random() * 100;
};

// Default main regions to display (only 3)
const mainRegions = [
  { name: 'Hippocampus' },
  { name: 'Ventricles' },
  { name: 'Temporal Lobe' }
];

export default function ResultsPanel({ 
  results, 
  onReset, 
  onSaveResults, 
  onPrintReport 
}: ResultsPanelProps) {
  // Always use the three main regions
  const randomizedRegions = mainRegions.map(region => ({
    name: region.name,
    status: getRandomStatus(),
    score: getRandomScore()
  }));
  
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
      <div className="border-b border-gray-200 pb-5">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <dt className="text-sm font-medium text-gray-500">Confidence</dt>
            <dd className="mt-1 text-lg font-semibold">
              <span 
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                  results.prediction === 'Non Demented' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {results.prediction || 'Unknown'}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Prediction</dt>
            <dd className="mt-1 text-lg font-semibold">{results.confidence || '0%'}</dd>
          </div>
        </dl>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900">Detailed Analysis</h3>
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {randomizedRegions.map((region, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {region.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.score.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>
            <h4 className="text-base font-medium text-gray-900">Notes</h4>
            <p className="mt-2 text-sm text-gray-500">{results.details?.notes || "This is an automated analysis based on pattern recognition algorithms."}</p>
          </div>
          <div>
            <h4 className="text-base font-medium text-gray-900">Recommendations</h4>
            <p className="mt-2 text-sm text-gray-500">{results.details?.recommendations || "Follow up with a healthcare professional for comprehensive evaluation."}</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={onReset} variant="secondary">
            Analyze Another Image
          </Button>
          <Button onClick={onSaveResults}>
            Save to Patient Record
          </Button>
          <Button onClick={onPrintReport} variant="primary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
            Print Report
          </Button>
        </div>
      </div>
    </div>
  );
}