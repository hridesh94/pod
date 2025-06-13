import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check EmailJS configuration validity
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    const validationResults = {
      serviceId: {
        value: serviceId,
        valid: serviceId?.startsWith('service_') || false,
        format: 'Should start with "service_"'
      },
      templateId: {
        value: templateId,
        valid: templateId?.startsWith('template_') || false,
        format: 'Should start with "template_"'
      },
      publicKey: {
        value: publicKey ? `${publicKey.substring(0, 8)}...` : 'MISSING',
        valid: (publicKey?.length ?? 0) >= 10,
        format: 'Should be a long alphanumeric string'
      }
    };
    
    const allValid = Object.values(validationResults).every(r => r.valid);
    
    // Check if these might be placeholder/demo values
    const possiblePlaceholders = [
      serviceId?.includes('placeholder'),
      templateId?.includes('placeholder'),
      serviceId === 'service_3h9q6od', // This looks like a demo ID
      templateId === 'template_vjHbtARSgndUiyEPZ' // This looks like a demo ID
    ].some(Boolean);
    
    return NextResponse.json({
      success: allValid && !possiblePlaceholders,
      message: allValid 
        ? possiblePlaceholders 
          ? 'Configuration format is correct but values appear to be demo/placeholder credentials'
          : 'EmailJS configuration appears valid'
        : 'EmailJS configuration has format issues',
      validation: validationResults,
      possiblePlaceholders,
      recommendations: [
        !validationResults.serviceId.valid && 'Fix service ID format (should start with "service_")',
        !validationResults.templateId.valid && 'Fix template ID format (should start with "template_")',
        !validationResults.publicKey.valid && 'Provide a valid public key',
        possiblePlaceholders && 'Replace demo/placeholder values with real EmailJS credentials from your dashboard'
      ].filter(Boolean)
    });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Validation failed: ${error.message}`,
      error: error.toString()
    }, { status: 500 });
  }
}
