const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: String, required: true },
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
        enum: ['None', 'Associates', 'Bachelors', 'Masters', 'Ph.D']
    },
    contract: {
        type: String,
        enum: ['full-time', 'part-time', 'contract-to-hire']
    },
    temp: { type: Boolean, default: false },
    arbitraryRelocation: { type: Boolean, required: true },
    location: { type: String },
    mainSkill: { type: String },
    datePosted: { type: Date, required: true },
    dateApplicationSent: { type: Date, required: true, default: Date.now },
    // Link to resume
    // Link to cover letter
    givenReferral: { type: Boolean, default: false },
    companyLinkedIn: { type: String },
    expectedSalary: { type: Number },
    field: { type: String },
    response: { type: String, default: 'No Response' },
    interviewId: { type: String }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Application', schema);
