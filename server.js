require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const Reference = require('./app/models/reference');
const Project = require('./app/models/project');
const Service = require('./app/models/service');
const User = require('./app/models/user');
const referenceController = require('./app/controllers/referenceController');
const projectController = require('./app/controllers/projectController');
const serviceController = require('./app/controllers/serviceController');
const userController = require('./app/controllers/userController');
const referenceRouter = require('./app/routers/reference');
const projectRouter = require('./app/routers/project');
const serviceRouter = require('./app/routers/service');
const userRouter = require('./app/routers/user');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/references', referenceRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.json({ message: `Server running on port ${PORT}` });
});

app.post('/api/projects', async (req, res, next) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        next(err);
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

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