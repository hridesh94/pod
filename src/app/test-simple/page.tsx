"use client";

import React, { useState } from 'react';

export default function TestSimple() {
  const [message, setMessage] = useState('Ready to test');

  const testMockEmail = async () => {
    setMessage('Testing mock email...');
    
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
        setMessage(`✅ Success: ${result.message}`);
      } else {
        setMessage(`❌ Error: ${result.message}`);
      }
    } catch (error: any) {
      setMessage(`❌ Network Error: ${error.message}`);
    }
  };

  const testEmailJSValidation = async () => {
    setMessage('Validating EmailJS config...');
    
    try {
      const response = await fetch('/api/validate-emailjs');
      const result = await response.json();
      
      setMessage(`Validation: ${result.message}\n\nRecommendations:\n${result.recommendations?.join('\n') || 'None'}`);
    } catch (error: any) {
      setMessage(`Validation failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Simple Test Page
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">
            {message}
          </pre>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={testMockEmail}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Test Mock Email
          </button>
          
          <button
            onClick={testEmailJSValidation}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Validate EmailJS
          </button>
        </div>
      </div>
    </div>
  );
}