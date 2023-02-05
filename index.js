const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const app = express();
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
