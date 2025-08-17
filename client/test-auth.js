// Simple test script to verify authentication endpoints
// Run with: node test-auth.js

const API_BASE_URL = 'http://localhost:3001/api'

async function testAuth() {
  console.log('🧪 Testing Seder Authentication Flow\n')

  // Test registration
  console.log('1. Testing registration...')
  const registerData = {
    email: 'test@example.com',
    password: 'testpassword123',
    firstName: 'Test',
    lastName: 'User'
  }

  try {
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(registerData)
    })

    const registerResult = await registerResponse.json()
    console.log('   Status:', registerResponse.status)
    console.log('   Success:', registerResult.success)
    console.log('   Message:', registerResult.message || registerResult.error)
  } catch (error) {
    console.log('   ❌ Registration failed:', error.message)
  }

  console.log('\n2. Testing login...')
  const loginData = {
    email: 'test@example.com',
    password: 'testpassword123'
  }

  try {
    const loginResponse = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(loginData)
    })

    const loginResult = await loginResponse.json()
    console.log('   Status:', loginResponse.status)
    console.log('   Success:', loginResult.success)
    console.log('   Message:', loginResult.message || loginResult.error)
    
    if (loginResult.success) {
      console.log('   User:', loginResult.user?.email)
    }
  } catch (error) {
    console.log('   ❌ Login failed:', error.message)
  }

  console.log('\n3. Testing /me endpoint...')
  try {
    const meResponse = await fetch(`${API_BASE_URL}/me`, {
      method: 'GET',
      credentials: 'include'
    })

    const meResult = await meResponse.json()
    console.log('   Status:', meResponse.status)
    console.log('   Success:', meResult.success)
    
    if (meResult.success) {
      console.log('   User:', meResult.user?.email)
    } else {
      console.log('   Error:', meResult.error)
    }
  } catch (error) {
    console.log('   ❌ /me failed:', error.message)
  }

  console.log('\n✅ Auth flow test completed!')
}

testAuth() 