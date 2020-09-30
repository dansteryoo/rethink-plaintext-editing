const mongoose = require('mongoose');
const config = require('./config/keys');
const db = config.get('mongoURI');
const express = require('express');

const app = express();

const connectDB = async () => {
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
app.use('/', require('./routes'));
app.listen(5000, () => console.log(`Server running on port 5000`));