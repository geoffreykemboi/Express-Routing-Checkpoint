const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
  const now = new Date();
  const day = now.getDay(); // Sunday = 0, Monday = 1, Tuesday = 2, ..., Saturday = 6
  const hour = now.getHours(); // 0 - 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Within working hours
  } else {
    res.send('<h1>Access Denied!</h1><p>This app is only available from Monday to Friday, 9AM to 5PM.</p>');
  }
}

// Set view engine to EJS
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Apply middleware globally
app.use(checkWorkingHours);

// Routes 
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
