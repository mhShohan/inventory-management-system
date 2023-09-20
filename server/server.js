const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// project import
const errorHandler = require('./middleware/errorMiddleware');

//init app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// environment variable
const PORT = process.env.PORT || 4000;
const URI = process.env.MONGO_URL;

//Routes
app.use('/api/v1', require('./routes'));

//error handler
app.use(errorHandler);


// connect to db and listening 
mongoose.connect(URI, { connectTimeoutMS: 1000 })
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
    })
    .catch((err) => console.log(err));
