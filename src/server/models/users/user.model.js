const mongoose = require('mongoose');
const Application = require('../applications/application.model');
const Interview = require('../interviews/interview.model');
const Contact = require('../contacts/contact.model');

const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    location: { type: String },
    fullName: { type: String },
    applications: [Application],
    interviews: [Interview],
    contacts: [Contact],
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
