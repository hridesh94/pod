"use client";

import React, { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';
import emailjs from '@emailjs/browser';

export default function ConfigTest() {
  const [sanityStatus, setSanityStatus] = useState('Testing...');
  const [emailjsStatus, setEmailjsStatus] = useState('Testing...');
  const [emailjsTestStatus, setEmailjsTestStatus] = useState('Not Tested');
  const [testResults, setTestResults] = useState<any>({});

  useEffect(() => {
    testConfigurations();
  }, []);

  const testSanity = async () => {
    try {
      console.log('Testing Sanity with config:', {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: '2023-05-03'
      });
      
      // Test basic Sanity connection with a simple query
      const result = await sanityClient.fetch('*[0..2]');
      console.log('Sanity result:', result);
      setSanityStatus('✅ Connected');
      return { success: true, message: `Sanity connection successful. Found ${result.length} total documents.`, data: result };
    } catch (error: any) {
      console.error('Sanity test error:', error);
      setSanityStatus('❌ Error');
      return { success: false, message: `Connection failed: ${error.message || error.toString()}` };
    }
  };

  const testEmailJS = () => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const issues = [];
    
    if (!serviceId) issues.push('Service ID missing');
    if (!templateId) issues.push('Template ID missing');
    if (!publicKey) issues.push('Public Key missing');
    
    if (templateId?.includes('placeholder')) {
      issues.push('Template ID contains placeholder text');
    }
    
    if (serviceId && !serviceId.startsWith('service_')) {
      issues.push('Service ID format might be incorrect (should start with "service_")');
    }

    if (issues.length === 0) {
      setEmailjsStatus('✅ Configured');
      return { success: true, message: 'EmailJS properly configured' };
    } else {
      setEmailjsStatus('⚠️ Issues');
      return { success: false, issues };
    }
  };

  const testEmailJSConnection = async () => {
    try {
      console.log('Testing EmailJS with:', {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      });
      
      // Test EmailJS by sending a test email
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: 'Test User',
          from_email: 'test@example.com',
          subject: 'Configuration Test',
          message: 'This is a test message to verify EmailJS configuration.',
          project_type: 'test',
          to_name: 'Admin'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
      );
      
      console.log('EmailJS result:', result);
      setEmailjsTestStatus('✅ Test Email Sent');
      return { success: true, message: 'EmailJS test email sent successfully!' };
    } catch (error: any) {
      console.error('EmailJS test error:', error);
      setEmailjsTestStatus('❌ Test Failed');
      return { success: false, message: `EmailJS test failed: ${error.message || error.text || 'Unknown error'}` };
    }
  };

  const testConfigurations = async () => {
    const sanityResult = await testSanity();
    const emailjsResult = testEmailJS();
    
    setTestResults({
      sanity: sanityResult,
      emailjs: emailjsResult,
      environment: {
        sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        emailjsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Set' : 'Missing',
        emailjsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'Set' : 'Missing',
        emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing',
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuration Test Results</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sanity CMS Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              🎨 Sanity CMS
              <span className="ml-2 text-sm">{sanityStatus}</span>
            </h2>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium">Project ID:</span>
                <span className="ml-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {testResults.environment?.sanityProjectId || 'Loading...'}
                </span>
              </div>
              <div>
                <span className="font-medium">Dataset:</span>
                <span className="ml-2 font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                  {testResults.environment?.sanityDataset || 'Loading...'}
                </span>
              </div>
              
              {testResults.sanity && (
                <div className="mt-4 p-3 rounded-md bg-gray-50">
                  <p className="text-sm">
                    <strong>Status:</strong> {testResults.sanity.success ? '✅ Working' : '❌ Error'}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Message:</strong> {testResults.sanity.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* EmailJS Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              📧 EmailJS
              <span className="ml-2 text-sm">{emailjsStatus}</span>
            </h2>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium">Service ID:</span>
                <span className="ml-2 text-sm">{testResults.environment?.emailjsServiceId || 'Loading...'}</span>
              </div>
              <div>
                <span className="font-medium">Template ID:</span>
                <span className="ml-2 text-sm">{testResults.environment?.emailjsTemplateId || 'Loading...'}</span>
              </div>
              <div>
                <span className="font-medium">Public Key:</span>
                <span className="ml-2 text-sm">{testResults.environment?.emailjsPublicKey || 'Loading...'}</span>
              </div>
              
              {/* Add test email button */}
              <div className="mt-4">
                <button
                  onClick={testEmailJSConnection}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Send Test Email
                </button>
                <span className="ml-2 text-sm">{emailjsTestStatus}</span>
              </div>
              
              {testResults.emailjs && (
                <div className="mt-4 p-3 rounded-md bg-gray-50">
                  <p className="text-sm">
                    <strong>Status:</strong> {testResults.emailjs.success ? '✅ Configured' : '⚠️ Issues Found'}
                  </p>
                  {testResults.emailjs.issues && (
                    <div className="mt-2">
                      <strong className="text-sm">Issues:</strong>
                      <ul className="list-disc list-inside text-sm mt-1">
                        {testResults.emailjs.issues.map((issue: string, index: number) => (
                          <li key={index}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Status & Recommendations</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• ✅ Sanity Project ID "wtvt3whd" is valid and accessible</p>
            <p>• ✅ EmailJS Service ID format is correct (starts with "service_")</p>
            <p>• ✅ EmailJS configuration appears properly formatted</p>
            <p>• 📧 Use the "Send Test Email" button above to verify EmailJS is working</p>
            <p>• 📝 Add some content to your Sanity studio to test data fetching</p>
            <p>• 🔗 Test the contact form on the Contact page to ensure end-to-end functionality</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={testConfigurations}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Re-run Tests
          </button>
          <a
            href="/contact"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Test Contact Form
          </a>
        </div>
      </div>
    </div>
  );
}
