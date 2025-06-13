const { createClient } = require('next-sanity');

// Test script to verify configurations
async function testConfigurations() {
  console.log('🧪 Testing Configurations...\n');
  
  // Test environment variables loading
  console.log('📋 Environment Variables:');
  console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set');
  console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set');
  console.log('NEXT_PUBLIC_EMAILJS_SERVICE_ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? 'Set ✅' : 'Not set ❌');
  console.log('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? 'Set ✅' : 'Not set ❌');
  console.log('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'Set ✅' : 'Not set ❌');
  
  // Test Sanity configuration
  console.log('\n🎨 Testing Sanity CMS Configuration...');
  
  const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-05-03',
    useCdn: process.env.NODE_ENV === 'production',
  };
  
  if (!sanityConfig.projectId) {
    console.log('❌ Sanity Project ID is missing');
    return;
  }
  
  if (!sanityConfig.dataset) {
    console.log('❌ Sanity Dataset is missing');
    return;
  }
  
  console.log('✅ Sanity configuration looks valid');
  console.log('   Project ID:', sanityConfig.projectId);
  console.log('   Dataset:', sanityConfig.dataset);
  
  // Test Sanity connection
  try {
    const client = createClient(sanityConfig);
    console.log('✅ Sanity client created successfully');
    
    // Try a simple query
    const result = await client.fetch('*[_type == "sanity.imageAsset"][0]');
    console.log('✅ Sanity query executed successfully');
    console.log('   Result:', result ? 'Data available' : 'No data found (normal for new projects)');
    
  } catch (error) {
    console.log('❌ Sanity connection test failed:', error.message);
    
    if (error.message.includes('Unauthorized')) {
      console.log('   This might be due to CORS settings or authentication.');
      console.log('   For read operations, this is often normal.');
    }
  }
  
  // Test EmailJS configuration
  console.log('\n📧 Testing EmailJS Configuration...');
  
  const emailConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  };
  
  let emailIssues = [];
  
  if (!emailConfig.serviceId) {
    emailIssues.push('Service ID is missing');
  } else if (emailConfig.serviceId.includes('servservice')) {
    emailIssues.push('Service ID appears to have formatting issues');
  }
  
  if (!emailConfig.templateId) {
    emailIssues.push('Template ID is missing');
  } else if (emailConfig.templateId.includes('placeholder')) {
    emailIssues.push('Template ID still contains placeholder text');
  }
  
  if (!emailConfig.publicKey) {
    emailIssues.push('Public Key is missing');
  } else if (emailConfig.publicKey.length < 15) {
    emailIssues.push('Public Key seems too short');
  }
  
  if (emailIssues.length === 0) {
    console.log('✅ EmailJS configuration looks valid');
    console.log('   All required variables are present');
  } else {
    console.log('⚠️  EmailJS configuration issues:');
    emailIssues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  console.log('\n📊 Summary:');
  console.log('Sanity CMS: Configuration appears valid');
  console.log('EmailJS:', emailIssues.length === 0 ? 'Configuration valid' : 'Issues found');
  
  if (emailIssues.length > 0) {
    console.log('\n💡 Next Steps:');
    console.log('1. Check your EmailJS dashboard for correct values');
    console.log('2. Ensure Service ID format is correct (usually service_xxxxxxx)');
    console.log('3. Verify Template ID from your EmailJS templates');
    console.log('4. Confirm Public Key from EmailJS account settings');
  }
}

// Load environment variables and run tests
require('dotenv').config({ path: '.env.local' });
testConfigurations().catch(console.error);
