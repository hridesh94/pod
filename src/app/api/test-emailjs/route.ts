import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('EmailJS Environment Variables:', {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'SET' : 'MISSING'
    });
    
    // Test EmailJS configuration by making a server-side request
    const emailjsData = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: body.from_name || 'Test User',
        from_email: body.from_email || 'test@test.com',
        subject: body.subject || 'Test Email from Portfolio Site',
        message: body.message || 'This is a test message from the configuration test.',
        project_type: body.project_type || 'Configuration Test',
        to_name: 'Hridesh',
        reply_to: body.from_email || 'test@test.com'
      }
    };
    
    console.log('Sending EmailJS data:', JSON.stringify(emailjsData, null, 2));
    
    // Make request to EmailJS API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Site/1.0)'
      },
      body: JSON.stringify(emailjsData),
    });
    
    const responseText = await response.text();
    console.log('EmailJS Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText
    });
    
    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'EmailJS test email sent successfully!',
        status: response.status,
        response: responseText
      });
    } else {
      return NextResponse.json({
        success: false,
        message: `EmailJS failed with status ${response.status}: ${response.statusText}`,
        error: responseText,
        config: {
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'SET' : 'MISSING'
        },
        debug: {
          url: 'https://api.emailjs.com/api/v1.0/email/send',
          method: 'POST',
          status: response.status,
          statusText: response.statusText
        }
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error('EmailJS API test error:', error);
    
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
