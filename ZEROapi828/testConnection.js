const axios = require('axios');

// API configuration for Function
const apiUrl = 'http://58.177.151.102:20011/api/v1/test/connection';
const apiKey = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2'; 

// Function to test connection to the new API
async function testConnection() {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'API-key': apiKey,
            },
        });
        console.log('Response:', response.data);
    } catch (error) {
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else if (error.request) {
            // No response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error', error.message);
        }
    }
}

// Run the test
testConnection();
