const mongoose = require('mongoose');
const Application = require('../applications/application.model');
const Interview = require('../interviews/interview.model');
const Contact = require('../contacts/contact.model');

const Schema = mongoose.Schema;

const SettingsSchema = mongoose.Schema({
    isDarkMode: { type: Boolean, default: false },
    defaultApplicationDisplayStyle: {
        type: String,
        enum: ['Card', 'List'],
        default: 'Card',
    },
});

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    hash: { type: String },
    createdDate: { type: Date, default: Date.now },
    location: { type: String },
    fullName: { type: String },
    applications: [Application],
    interviews: [Interview],
    contacts: [Contact],
    settings: { type: SettingsSchema, required: true },
    cloudinary_id: String,
    profileImage: String,
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
