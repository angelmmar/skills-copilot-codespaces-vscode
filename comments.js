// Create a web server
// Load the comments.json file
// Parse the JSON to an object and return it to the user

// Load the fs module
const fs = require('fs');
// Load the http module
const http = require('http');
// Load the path module
const path = require('path');

// Create the server
const server = http.createServer();

// Listen to the request event
server.on('request', (req, res) => {
    // Set the content type
    res.setHeader('Content-Type', 'application/json');
    // Set the status code
    res.statusCode = 200;
    // Get the file path
    const filePath = path.join(__dirname, 'comments.json');
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.end('Error');
        } else {
            // Parse the json to an object
            const comments = JSON.parse(data);
            // Send the comments back to the user
            res.end(JSON.stringify(comments));
        }
    });
});

// Start the server
server.listen(3000, () => console.log('Server is running on port 3000...'));