import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate environment variables first
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json({
        success: false,
        message: 'Missing EmailJS configuration',
        missing: {
          serviceId: !serviceId,
          templateId: !templateId,
          publicKey: !publicKey
        }
      }, { status: 400 });
    }
    
    // Check if the service ID format is correct
    if (!serviceId.startsWith('service_')) {
      return NextResponse.json({
        success: false,
        message: 'Invalid service ID format - should start with "service_"',
        currentServiceId: serviceId
      }, { status: 400 });
    }
    
    // Check if template ID format is correct
    if (!templateId.startsWith('template_')) {
      return NextResponse.json({
        success: false,
        message: 'Invalid template ID format - should start with "template_"',
        currentTemplateId: templateId
      }, { status: 400 });
    }
    
    console.log('Testing EmailJS with validated configuration:', {
      serviceId,
      templateId,
      publicKey: publicKey.substring(0, 8) + '...' // Only show first 8 chars for security
    });
    
    // Prepare EmailJS data with correct structure
    const emailjsPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: body.from_name || 'Test User',
        from_email: body.from_email || 'test@example.com',
        to_name: 'Hridesh',
        subject: body.subject || 'Test Email from Portfolio Configuration',
        message: body.message || 'This is a test message to verify EmailJS configuration is working correctly.',
        project_type: body.project_type || 'Configuration Test',
        reply_to: body.from_email || 'test@example.com'
      }
    };
    
    console.log('Sending EmailJS payload:', JSON.stringify(emailjsPayload, null, 2));
    
    // Try multiple EmailJS endpoints to find the working one
    const endpoints = [
      'https://api.emailjs.com/api/v1.0/email/send',
      'https://api.emailjs.com/api/v1.0/email/send-form'
    ];
    
    let lastError = null;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
          },
          body: JSON.stringify(emailjsPayload),
        });
        
        const responseText = await response.text();
        
        console.log(`Response from ${endpoint}:`, {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseText
        });
        
        if (response.ok) {
          return NextResponse.json({
            success: true,
            message: `EmailJS test email sent successfully via ${endpoint}!`,
            status: response.status,
            response: responseText,
            endpoint: endpoint
          });
        } else if (response.status === 400) {
          // Bad request might indicate configuration issue
          return NextResponse.json({
            success: false,
            message: `EmailJS configuration error (400): ${responseText}`,
            error: responseText,
            endpoint: endpoint,
            config: {
              service_id: serviceId,
              template_id: templateId,
              user_id: 'SET'
            }
          }, { status: 400 });
        } else {
          lastError = {
            endpoint,
            status: response.status,
            statusText: response.statusText,
            response: responseText
          };
        }
      } catch (fetchError: any) {
        console.error(`Fetch error for ${endpoint}:`, fetchError);
        lastError = {
          endpoint,
          error: fetchError.message,
          type: 'network_error'
        };
      }
    }
    
    // If we get here, all endpoints failed
    return NextResponse.json({
      success: false,
      message: 'All EmailJS endpoints failed',
      lastError,
      config: {
        service_id: serviceId,
        template_id: templateId,
        user_id: 'SET'
      },
      suggestions: [
        'Verify your EmailJS service ID is correct',
        'Check if your EmailJS template ID exists',
        'Ensure your EmailJS public key is valid',
        'Check EmailJS dashboard for service status'
      ]
    }, { status: 500 });
    
  } catch (error: any) {
    console.error('EmailJS test error:', error);
    
    return NextResponse.json({
      success: false,
      message: `EmailJS test failed: ${error.message}`,
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    }, { status: 500 });
  }
}
