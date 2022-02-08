const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    position: { type: String },
    email: { type: String },
    phone: { type: String },
});

schema.set('toJSON', { virtuals: true });

module.exports = schema;
