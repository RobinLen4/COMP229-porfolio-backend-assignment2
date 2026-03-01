const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String},
    company: { type: String}
});

module.exports = mongoose.model('reference', referenceSchema);