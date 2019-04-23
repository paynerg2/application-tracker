const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true
});
// this may not be necessary with Mongoose 5
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};
