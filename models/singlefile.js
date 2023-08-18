const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema({
    file: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('SingleFile', singleFileSchema);