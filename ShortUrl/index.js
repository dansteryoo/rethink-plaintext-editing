const mongoose = require('mongoose');
const config = require('./config/keys');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const connectDB = async () => {
  const db = config.mongoURI
  try {
    await mongoose.connect(db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error({ err });
    return process.exit(1);
  }
};

connectDB()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use('/', require('./routes'));
app.listen(5000, () => console.log(`Server running on port 5000`));