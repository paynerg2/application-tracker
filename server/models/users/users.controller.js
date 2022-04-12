const express = require('express');
const router = express.Router();
const upload = require('../../_helpers/multer');
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', upload.single('image'), register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.patch('/:id', update);
router.patch('/:id/settings', updateWithoutImage);
router.delete('/:id', _delete);
router.post('/googleAuth/:token', verifyWithGoogleToken);

module.exports = router;

function authenticate(req, res, next) {
    userService
        .authenticate(req.body)
        .then((response) =>
            response
                ? res.json(response)
                : res.status(400).json({ message: 'Email or password is incorrect' })
        )
        .catch((err) => next(err));
}

function verifyWithGoogleToken(req, res, next) {
    console.log('verify with google');
    userService
        .googleAuthenticate(req.params.token)
        .then((response) => (response ? res.json(response) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function register(req, res, next) {
    userService
        .create(req.body)
        .then((response) => (response ? res.json(response) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function getAll(req, res, next) {
    userService
        .getAll()
        .then((users) => res.json(users))
        .catch((err) => next(err));
}

function getCurrent(req, res, next) {
    userService
        .getById(req.user.sub)
        .then((user) => (user ? res.json(user) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function getById(req, res, next) {
    userService
        .getById(req.params.id)
        .then((user) => (user ? res.json(user) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function update(req, res, next) {
    userService
        .update(req.params.id, req.body)
        .then((updatedUser) => (updatedUser ? res.json(updatedUser) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function updateWithoutImage(req, res, next) {
    userService
        .updateWithoutImage(req.params.id, req.body)
        .then((updatedUser) => (updatedUser ? res.json(updatedUser) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function _delete(req, res, next) {
    userService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch((err) => next(err));
}
