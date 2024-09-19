const axios = require('axios');

// API configuration for Function 3
const apiUrl = 'http://58.177.151.102:20011/api/v1/backend/sales_ranking';
const apiKey = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2'; 

// Example request body for single search (You can modify the platform_id for testing)
const requestBody = {
    platform: 'Amazon',
    category: 'Robotic_Vacuum',
    // platform_id: 'B0CW15BW63', 
    platform_id:'B0CVZXPWWH',
    historical: false // Change to true for historical data
};

// Function to get sales and ranking
async function getSalesRanking(requestBody) {
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
getSalesRanking(requestBody);
