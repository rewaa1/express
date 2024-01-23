const express = require('express');
const app = express();

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.status(503).send('The web application is only available during working hours.');
  }
};

// Use tailwindcss for styling
app.use(express.static('public')); // Assuming your CSS is in a 'public' folder

// Use custom middleware for all routes
app.use(workingHoursMiddleware);

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html'); // Replace with your actual file path
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html'); // Replace with your actual file path
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html'); // Replace with your actual file path
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
