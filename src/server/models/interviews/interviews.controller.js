const express = require('express');
const router = express.Router();
const interviewService = require('./interview.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    interviewService
        .getAll(req.headers.authorization)
        .then((interviews) => res.json(interviews))
        .catch((err) => next(err));
}

function getById(req, res, next) {
    interviewService
        .getById(req.params.id, req.headers.authorization)
        .then((interview) => (interview ? res.json(interview) : res.sendStatus(404)))
        .catch((err) => next(err));
}

function create(req, res, next) {
    interviewService
        .create(req.body, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}

function update(req, res, next) {
    interviewService
        .update(req.params.id, req.body, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}

function _delete(req, res, next) {
    interviewService
        .delete(req.params.id, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}
