// app.js

const express = require('express');
const app = express();

// Logging Middleware
const requestLogger = (req, res, next) => {
  const startTime = Date.now(); // Capture start time for request processing
  const { method, url } = req; // Extract HTTP method and URL
  const timestamp = new Date().toISOString(); // Get timestamp of the request

  // Log request details when request is received
  console.log(`[${timestamp}] ${method} ${url} - Request received`);

  // When the response is finished, calculate the total time taken
  res.on('finish', () => {
    const endTime = Date.now(); // Time when response is finished
    const duration = endTime - startTime; // Calculate time taken for request processing
    const { statusCode } = res; // Get status code of the response
    console.log(`[${timestamp}] ${method} ${url} - Response sent with status ${statusCode} in ${duration}ms`);
  });

  next(); // Move to the next middleware or route handler
};

// Use requestLogger as global middleware for all routes
app.use(requestLogger);

// Sample route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Another sample route for testing
app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
