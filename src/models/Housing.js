const mongoose = require('mongoose');

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    }, 
    year: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    homeImage: {
        type: String,
        required: true
    },
    propertyDescription: {
        type: String,
        required: true
    },
    aveliablePieces: {
        type: Number,
        required: true
    }
});

let Housing = mongoose.model('Housing', housingSchema);

module.exports = Housing;