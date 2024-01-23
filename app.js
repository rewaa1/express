const express = require('express');
const app = express();

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); 
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next();
  } else {
    res.status(503).send('The web application is only available during working hours from 9 to 17.');
  }
};

app.use(workingHoursMiddleware);

app.use(express.static('public'));





app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html'); 
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html'); 
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html'); 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
