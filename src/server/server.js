require('rootpath')();
const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

console.log(process.env.API_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

// api routes
app.use('/users', require('./models/users/users.controller'));
app.use('/applications', require('./models/applications/applications.controller'));
app.use('/interviews', require('./models/interviews/interviews.controller'));
app.use('/contacts', require('./models/contacts/contacts.controller'));

// global error handler
app.use(errorHandler);

// start server
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
