// src/app/about/page.tsx
'use client';

import AppLayout from '@/components/layout/AppLayout';

export default function AboutAlzheimersPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">About Alzheimer's Disease</h1>
          <p className="mt-2 text-gray-600">Understanding the disease, its causes, and the current state of research</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is Alzheimer's Disease?</h2>
                <p className="text-gray-700 mb-4">
                  Alzheimer's disease is a progressive neurologic disorder that causes the brain to shrink (atrophy) and brain cells to die. It is the most common cause of dementia — a continuous decline in thinking, behavioral and social skills that affects a person's ability to function independently.
                </p>
                <p className="text-gray-700 mb-4">
                  Approximately 5.8 million people in the United States age 65 and older live with Alzheimer's disease. Of those, 80% are 75 years old and older. Out of the approximately 50 million people worldwide with dementia, between 60% and 70% are estimated to have Alzheimer's disease.
                </p>
                <p className="text-gray-700 mb-4">
                  The early signs of the disease include forgetting recent events or conversations. As the disease progresses, a person with Alzheimer's disease will develop severe memory impairment and lose the ability to carry out everyday tasks.
                </p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Symptoms of Alzheimer's</h3>
                <p className="text-gray-700 mb-4">
                  Memory loss is the key symptom of Alzheimer's disease. Early signs include difficulty remembering recent events or conversations. As the disease progresses, memory impairments worsen and other symptoms develop.
                </p>
                <p className="text-gray-700 mb-2">At first, a person with Alzheimer's disease may be aware of having difficulty remembering things and organizing thoughts. A family member or friend may be more likely to notice how the symptoms worsen.</p>
                
                <div className="mt-4 mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Brain changes associated with Alzheimer's disease:</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Shrinking of brain volume (atrophy)</li>
                    <li>Formation of amyloid plaques between nerve cells</li>
                    <li>Development of neurofibrillary tangles within nerve cells</li>
                    <li>Loss of connections between nerve cells</li>
                    <li>Inflammation and immune system activation</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Causes and Risk Factors</h3>
                <p className="text-gray-700 mb-4">
                  Scientists believe that for most people, Alzheimer's disease is caused by a combination of genetic, lifestyle and environmental factors that affect the brain over time.
                </p>
                <p className="text-gray-700 mb-4">
                  Less than 1% of the time, Alzheimer's is caused by specific genetic changes that virtually guarantee a person will develop the disease. These rare occurrences usually result in disease onset in middle age.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-800 mb-2">Risk Factors You Can Change</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Lack of exercise</li>
                      <li>Obesity</li>
                      <li>Smoking and alcohol use</li>
                      <li>High blood pressure</li>
                      <li>High cholesterol</li>
                      <li>Poorly controlled type 2 diabetes</li>
                      <li>Poor sleep patterns</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-800 mb-2">Risk Factors You Cannot Change</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Age (greatest risk factor)</li>
                      <li>Family history</li>
                      <li>Genetics (particularly APOE ε4 gene)</li>
                      <li>Down syndrome</li>
                      <li>Gender (females have higher incidence)</li>
                      <li>Previous head trauma</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Navigation */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-blue-600 text-white">
                <h3 className="font-medium">Quick Navigation</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">Overview</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Symptoms</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Causes and Risk Factors</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Diagnosis</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Stages of Alzheimer's</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Treatment Options</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Latest Research</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-700 hover:text-blue-600">Resources for Caregivers</a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Did You Know Box */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-green-600 text-white">
                <h3 className="font-medium">Did You Know?</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm">
                  Alzheimer's disease was first identified more than 100 years ago, but research into its symptoms, causes, risk factors and treatment has gained momentum only in the last 30 years.
                </p>
                <p className="text-gray-700 text-sm mt-3">
                  Although current Alzheimer's treatments cannot stop the progression of the disease, they can temporarily slow the worsening of dementia symptoms and improve quality of life.
                </p>
              </div>
            </div>
            
            {/* Help and Support */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 bg-purple-600 text-white">
                <h3 className="font-medium">Help and Support</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm mb-3">
                  If you or someone you know is affected by Alzheimer's disease, there are resources available to help.
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                  Find Support Resources
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Related Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-40 bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Diagnosis Methods</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Learn about the diagnostic process, including cognitive assessments and brain imaging techniques.
                </p>
                <a href="#" className="text-blue-600 hover:underline text-sm">Read more →</a>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-40 bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Disease Progression</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Understand how Alzheimer's typically progresses through different stages over time.
                </p>
                <a href="#" className="text-blue-600 hover:underline text-sm">Read more →</a>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="h-40 bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Research and Trials</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Explore the latest research developments and clinical trials for Alzheimer's treatments.
                </p>
                <a href="#" className="text-blue-600 hover:underline text-sm">Read more →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}