import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test basic network connectivity
    const tests = {
      sanity: {
        url: `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*%5B0..0%5D`,
        status: 'pending'
      },
      emailjs: {
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        status: 'pending'
      }
    };

    // Test Sanity API accessibility
    try {
      const sanityResponse = await fetch(tests.sanity.url);
      tests.sanity.status = sanityResponse.ok ? 'accessible' : `error-${sanityResponse.status}`;
    } catch (error) {
      tests.sanity.status = 'network-error';
    }

    // Test EmailJS API accessibility (just a HEAD request)
    try {
      const emailjsResponse = await fetch(tests.emailjs.url, { method: 'HEAD' });
      tests.emailjs.status = emailjsResponse.status === 405 ? 'accessible' : `error-${emailjsResponse.status}`;
    } catch (error) {
      tests.emailjs.status = 'network-error';
    }

    return NextResponse.json({
      success: true,
      message: 'Network connectivity test completed',
      tests,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Network test failed: ${error.message}`,
      error: error.toString()
    }, { status: 500 });
  }
}
