const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// API configuration for Function 1
const apiUrl1 = 'http://58.177.151.102:20010/api/v1/backend/item_searching';
const apiKey1 = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2';

// API configuration for Function 2
const apiUrl2 = 'http://58.177.151.102:20012/api/v1/backend/get_host_compatible';
const apiKey2 = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2';

// API configuration for Function 3
const apiUrl3 = 'http://58.177.151.102:20011/api/v1/backend/sales_ranking';
const apiKey3 = 'A0WLZ2Gke9N7hejjZ2hTTqaJWrncjJA2'; 

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));  // Serve home.html at the root
});

// Route to serve Function 1's web page (Search Host & Part)
app.get('/function1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'function1.html'));  // Serve index.html for Function 1
});

// Route to serve Function 2's web page (Get Compatible Part)
app.get('/function2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'function2.html'));  // Serve function2.html for Function 2
});

// Route to serve Function 3's web page
app.get('/function3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'function3.html'));
});


// Serve static files after explicit route handling
app.use(express.static(path.join(__dirname, 'public')));

// POST route to handle Function 1's search (Search Host & Part)
app.post('/search', async (req, res) => {
    try {
        const searchCriteria = req.body;
        const response = await axios.post(apiUrl1, searchCriteria, {
            headers: {
                'API-key': apiKey1,
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
});

// POST route to handle Function 2's search (Get Compatible Parts)
app.post('/getCompatibleParts', async (req, res) => {
    try {
        const { platform, platform_id } = req.body;
        const requestBody = {
            platform,
            platform_id
        };

        const response = await axios.post(apiUrl2, requestBody, {
            headers: {
                'API-key': apiKey2,
                'Content-Type': 'application/json',
            },
        });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
});

// POST route to handle Function 3's sales and ranking search
app.post('/getSalesRanking', async (req, res) => {
    try {
        const requestBody = req.body;

        // // Clean up the request body (ensure platform_id is not empty)
        // if (!requestBody.platform_id) {
        //     return res.status(400).json({ error: 'Platform ID is required' });
        // }

        // // Ensure historical is a boolean
        // requestBody.historical = requestBody.historical === 'true' || requestBody.historical === true;

        // Log the cleaned request body for debugging
        console.log('Modified Request Body:', requestBody);

        // Make the API request
        const response = await axios.post(apiUrl3, requestBody, {
            headers: {
                'API-key': apiKey3,
                'Content-Type': 'application/json',
            },
        });
        console.log('API Response:', response.data);  // Log the API response
        // Send the API response back to the frontend
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            console.error('API Error Response:', error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
