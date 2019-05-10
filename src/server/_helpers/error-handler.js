module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof err === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    // Mongoose error
    if (err.name === 'ValidationError') {
        // mongoose validation error
        console.log('validation error');
        console.log(err.message);
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}
