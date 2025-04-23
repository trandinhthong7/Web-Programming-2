const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocal = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');

const corsOptions = {
    origin: 'http://localhost:8080', // Allow requests from this origin
    optionsSuccessStatus: 200
};

// Mongoose connection string
mongoose.set('strictQuery', true); // Suppress deprecation warning
mongoose
    .connect('mongodb://localhost/vocal-builder', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
routes(app);

// 404 Middleware
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
    console.log(`Vocab Builder RESTful API server started on: ${port}`);
});