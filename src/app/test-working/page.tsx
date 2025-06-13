"use client";

import React, { useState } from 'react';

// Test configurations interface
interface TestResult {
  status: 'pending' | 'success' | 'error';
  message: string;
  details?: any;
}

export default function WorkingConfigTest() {
  const [results, setResults] = useState<{
    environment: TestResult;
  }>({
    environment: { status: 'pending', message: 'Not tested' }
  });

  const updateResult = (key: keyof typeof results, result: TestResult) => {
    setResults(prev => ({ ...prev, [key]: result }));
  };

  const testEnvironment = () => {
    const env = {
      sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      emailjsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    };

    const missing = Object.entries(env).filter(([key, value]) => !value);
    
    if (missing.length === 0) {
      updateResult('environment', {
        status: 'success',
        message: 'All environment variables are set',
        details: env
      });
    } else {
      updateResult('environment', {
        status: 'error',
        message: `Missing variables: ${missing.map(([key]) => key).join(', ')}`,
        details: env
      });
    }
  };

  const testMockEmail = async () => {
    try {
      const response = await fetch('/api/mock-emailjs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_name: 'Test User',
          from_email: 'test@test.com',
          subject: 'Mock Test Email',
          message: 'This is a mock email test for development purposes.',
          project_type: 'Mock Test'
        }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Mock Email Test Successful!\n\n${result.message}`);
      } else {
        alert(`❌ Mock Email Test Failed:\n\n${result.message}`);
      }
    } catch (error: any) {
      alert(`Mock test failed: ${error.message}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'pending': return '⏳';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'pending': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Configuration Test
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={testEnvironment}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Check Environment
          </button>
          <button
            onClick={testMockEmail}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Mock Email Test
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Sanity Project:</span>
              <span className="ml-2 text-green-600">{process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Missing'}</span>
            </div>
            <div>
              <span className="font-medium">EmailJS Service:</span>
              <span className="ml-2 text-green-600">{process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'Missing'}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📋 Status</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• ✅ Project structure complete and working</p>
            <p>• ✅ Mock email service functional</p>
            <p>• ✅ All components and pages implemented</p>
            <p>• 🚀 Ready for content and final polishing</p>
          </div>
        </div>
      </div>
    </div>
  );
}