require('dotenv').config();
const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const goalRoute = require('./routes/goalRoute');
const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoute);
app.use('/api/users', userRoute);

app.use(errorHandler);

app.listen(port, () => console.log(`Serever is running on port ${port}`));
