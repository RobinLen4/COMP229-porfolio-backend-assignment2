require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({ message: `Server running on port ${PORT}` });
});

app.use((req, res, next) => {
    next(createError(404, '404 - Not Found'));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});