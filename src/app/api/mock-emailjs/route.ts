import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📧 Mock EmailJS - Simulating email send...');
    console.log('Email details:', {
      from: `${body.from_name} <${body.from_email}>`,
      subject: body.subject,
      message: body.message.substring(0, 100) + '...',
      projectType: body.project_type
    });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful email sending
    return NextResponse.json({
      success: true,
      message: '✅ Mock Email Sent Successfully! (This is a development simulation)',
      status: 200,
      mockResponse: 'OK',
      emailDetails: {
        to: 'hridesh@example.com',
        from: `${body.from_name} <${body.from_email}>`,
        subject: body.subject,
        timestamp: new Date().toISOString()
      },
      note: 'This is a mock response for development. Replace with real EmailJS credentials for production.'
    });
    
  } catch (error: any) {
    console.error('Mock EmailJS error:', error);
    
    return NextResponse.json({
      success: false,
      message: `Mock EmailJS failed: ${error.message}`,
      error: error.toString()
    }, { status: 500 });
  }
}
