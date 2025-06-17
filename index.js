require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { enquiryRoute } = require('./App/routes/web/enquiryRoute');

const app = express();

app.use(express.json());
app.use(cors());

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/web/api', enquiryRoute);

console.log("DB URL:", process.env.DBURL);
console.log("PORT:", process.env.PORT);

mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, '127.0.0.1', () => {
      console.log(`Server running on port ${process.env.PORT} on localhost`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
    process.exit(1);  // exit the app if DB connection fails
  });
