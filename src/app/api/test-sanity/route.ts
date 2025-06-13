import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';

export async function GET() {
  try {
    // Test basic Sanity connection
    const result = await sanityClient.fetch('*[0..2]');
    
    return NextResponse.json({
      success: true,
      message: `Sanity API connected successfully. Found ${result.length} documents.`,
      data: result,
      config: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: '2023-05-03'
      }
    });
  } catch (error: any) {
    console.error('Sanity API test error:', error);
    
    return NextResponse.json({
      success: false,
      message: `Sanity connection failed: ${error.message}`,
      error: {
        message: error.message,
        details: error.details || 'No additional details',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    }, { status: 500 });
  }
}
