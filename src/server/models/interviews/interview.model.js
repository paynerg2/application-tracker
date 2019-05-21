const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    applicationId: { type: String, required: true },
    user: { type: String, required: true },
    startTime: { type: Date, required: true },
    location: { type: String },
    contact: { type: String },
    followUpSent: { type: Boolean, required: true, default: false },
    response: { type: String },
    offer: { type: Number, default: 0 },
    interviewType: { type: String },
    round: { type: Number, default: 1 },
    notes: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Interview', schema);
