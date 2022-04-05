const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    startTime: { type: Date, required: true },
    location: { type: String },
    contact: { type: String },
    company: { type: String, required: true },
    followUpSent: { type: Boolean, required: true, default: false },
    response: { type: String, enum: ['none', 'passed', 'rejected', 'offer'], default: 'none' },
    offer: { type: Number, default: 0 },
    interviewType: { type: String },
    round: { type: Number, default: 1 },
    notes: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = schema;
