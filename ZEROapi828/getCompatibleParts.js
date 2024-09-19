const axios = require('axios');

// API configuration for Function 2
const apiUrl = 'http://58.177.151.102:20012/api/v1/backend/get_host_compatible';
const apiKey = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2';

// Example request body for single search (You can modify the platform_id for testing)
const requestBody = {
    platform: 'Amazon',
    // platform_id: 'B0CW15BW63'  // Example single search platform ID
    // platform_id:  [
        // "B0CW15BW63",
        // "B0CQ4PLMJP"
        // ] //Multi-Search
    platform_id: 'B0CVZXPWWH'
};

// Function to get compatible parts of the host
async function getCompatibleParts() {
    try {
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'API-key': apiKey,
                'Content-Type': 'application/json',
            },
        });
        console.log('Response:', JSON.stringify(response.data, null, 2));  // Pretty-print the JSON response
    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error', error.message);
        }
    }
}

// Run the function
getCompatibleParts();
