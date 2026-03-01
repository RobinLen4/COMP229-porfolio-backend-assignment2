const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completion: { type: Date, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('project', projectSchema);  