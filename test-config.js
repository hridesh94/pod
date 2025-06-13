// Test script to verify Sanity CMS and EmailJS connections
import { sanityClient } from '../src/lib/sanity';

// Test Sanity Connection
async function testSanityConnection() {
  console.log('🔍 Testing Sanity CMS Connection...');
  console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);
  
  try {
    // Test basic connection by fetching schema
    const result = await sanityClient.fetch('*[_type == "sanity.imageAsset"][0]');
    console.log('✅ Sanity CMS connection successful!');
    console.log('Sample query result:', result ? 'Data found' : 'No data found (but connection works)');
    return true;
  } catch (error) {
    console.error('❌ Sanity CMS connection failed:', error.message);
    return false;
  }
}

// Test EmailJS Configuration
function testEmailJSConfig() {
  console.log('\n📧 Testing EmailJS Configuration...');
  
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  
  console.log('Service ID:', serviceId ? '✅ Set' : '❌ Missing');
  console.log('Template ID:', templateId ? '✅ Set' : '❌ Missing');
  console.log('Public Key:', publicKey ? '✅ Set' : '❌ Missing');
  
  // Check if all required EmailJS variables are present
  if (serviceId && templateId && publicKey) {
    console.log('✅ All EmailJS environment variables are configured');
    
    // Check for common issues in the configuration
    const issues = [];
    
    if (templateId.includes('placeholder')) {
      issues.push('Template ID appears to contain placeholder text');
    }
    
    if (serviceId.length < 10) {
      issues.push('Service ID seems too short');
    }
    
    if (publicKey.length < 15) {
      issues.push('Public Key seems too short');
    }
    
    if (issues.length > 0) {
      console.log('⚠️  Potential issues found:');
      issues.forEach(issue => console.log(`   - ${issue}`));
      return false;
    }
    
    return true;
  } else {
    console.log('❌ Some EmailJS environment variables are missing');
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('🧪 Running Configuration Tests...\n');
  
  const sanityResult = await testSanityConnection();
  const emailjsResult = testEmailJSConfig();
  
  console.log('\n📊 Test Summary:');
  console.log(`Sanity CMS: ${sanityResult ? '✅ Working' : '❌ Issues found'}`);
  console.log(`EmailJS: ${emailjsResult ? '✅ Configured' : '❌ Issues found'}`);
  
  if (sanityResult && emailjsResult) {
    console.log('\n🎉 All configurations are working properly!');
  } else {
    console.log('\n⚠️  Some issues found. Please check the details above.');
  }
}

// Export for use in other files
export { testSanityConnection, testEmailJSConfig, runTests };
