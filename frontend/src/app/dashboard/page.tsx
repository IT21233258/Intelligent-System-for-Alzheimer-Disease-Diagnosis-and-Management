// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

export default function Dashboard() {
  const { user } = useAuth();
  
  // Mock data for recent predictions
  const recentPredictions = [
    { id: '1', date: '2025-03-08', prediction: 'Non Demented', confidence: '92.5%' },
    { id: '2', date: '2025-03-06', prediction: 'Demented', confidence: '87.3%' },
    { id: '3', date: '2025-03-02', prediction: 'Non Demented', confidence: '91.8%' }
  ];
  
  // Mock data for stats
  const stats = [
    { name: 'Total Scans', value: '27' },
    { name: 'Positive Results', value: '8' },
    { name: 'Negative Results', value: '19' },
    { name: 'Avg. Confidence', value: '89.4%' }
  ];
  
  // Service cards
  const services = [
    {
      title: 'MRI-Based Detection',
      description: 'Upload and analyze brain MRI scans for signs of Alzheimer\'s disease.',
      path: '/mri-detection',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Emotion Recognition',
      description: 'Analyze facial expressions to detect emotional patterns related to cognitive health.',
      path: '/emotion-recognition',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Risk Analysis',
      description: 'Assess potential risk factors based on patient history and biomarkers.',
      path: '/risk-analysis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: 'Memory Therapy',
      description: 'Interactive exercises and games designed to help with memory and cognitive function.',
      path: '/memory-therapy',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];
  
  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome{user ? `, ${user.name.split(' ')[0]}` : ''}
            </h1>
            <p className="mt-2 text-gray-600">
              Alzheimer's Care Platform — AI-powered tools for early detection and management
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* Services Grid */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <Link 
                key={index} 
                href={service.path} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentPredictions.map((prediction) => (
                <div key={prediction.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(prediction.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        MRI Analysis
                      </p>
                    </div>
                    <div>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          prediction.prediction === 'Non Demented' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {prediction.prediction}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        {prediction.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <Link 
                href="/history" 
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}