const express = require('express');
const router = express.Router();
const applicationService = require('./application.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    applicationService
        .getAll(req.headers.authorization)
        .then((applications) => res.json(applications))
        .catch((err) => next(err));
}

function getById(req, res, next) {
    // respond with 404 if application not found
    applicationService
        .getById(req.params.id, req.headers.authorization)
        .then((application) => (application ? res.json(application) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function create(req, res, next) {
    applicationService
        .create(req.body, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}

function update(req, res, next) {
    applicationService
        .update(req.params.id, req.body, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}

function _delete(req, res, next) {
    applicationService
        .delete(req.params.id, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}
