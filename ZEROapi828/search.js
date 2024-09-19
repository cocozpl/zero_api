const axios = require('axios');

// API configuration
const apiUrl = 'http://58.177.151.102:20010/api/v1/backend/item_searching';
const apiKey = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2';

// Sample search criteria (modify as needed)
const searchCriteria = {
  platform: 'Amazon',
  item_type: 'host',
  category: 'Robotic_Vacuum',
  platform_id: 'B0CVZXPWWH', 
  brand: 'iRobot',
  historical: true,
};

// Function to search for host or part based on input criteria
async function searchItem(searchCriteria) {
  try {
    const response = await axios.post(apiUrl, searchCriteria, {
      headers: {
        'API-key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Pretty-print the response with full array content
    console.log('Search Response:', JSON.stringify(response.data, null, 2));

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

// Run the search
searchItem(searchCriteria);
