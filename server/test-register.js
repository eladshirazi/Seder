// Simple test script to verify the registration endpoint
// Run with: node test-register.js
import fetch from 'node-fetch'

const testUser = {
  email: 'test@example.com',
  password: 'testpassword123',
  firstName: 'Test',
  lastName: 'User'
}

async function testRegistration() {
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })

    const data = await response.json()
    
    console.log('Status:', response.status)
    console.log('Response:', JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('✅ Registration test passed!')
    } else {
      console.log('❌ Registration test failed!')
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testRegistration()
} 