const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    jobDescriptionLink: { type: String },
    requiredSkillsTotal: { type: Number },
    requiredSkillsMet: { type: Number },
    additionalSkillsTotal: { type: Number },
    additionalSkillsMet: { type: Number },
    yearsOfExperience: { type: Number, default: 0 },
    degreeLevel: {
        type: String,
        enum: ['None', 'Associates', 'Bachelors', 'Masters', 'Ph.D'],
    },
    contract: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'contract-to-hire'],
    },
    temp: { type: Boolean, default: false },
    arbitraryRelocation: { type: Boolean, default: false },
    location: { type: String },
    mainSkill: { type: String },
    datePosted: { type: Date, required: false },
    dateApplicationSent: { type: Date, required: false, default: Date.now },
    // Link to resume
    // Link to cover letter
    givenReferral: { type: Boolean, default: false },
    companyLinkedIn: { type: String },
    expectedSalary: { type: Number, default: 0 },
    field: { type: String },
    response: {
        type: String,
        enum: ['No Response', 'Rejected', 'Interview'],
        default: 'No Response',
    },
    interviewId: [String],
});

schema.set('toJSON', { virtuals: true });

module.exports = schema;
