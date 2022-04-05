const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
// this may not be necessary with Mongoose 5
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/users/user.model'),
    Application: require('../models/applications/application.model'),
    Interview: require('../models/interviews/interview.model'),
};
