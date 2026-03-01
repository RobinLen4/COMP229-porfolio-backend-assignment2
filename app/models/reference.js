const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true }
});

module.exports = mongoose.model('reference', referenceSchema);