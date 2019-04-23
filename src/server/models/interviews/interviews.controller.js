const express = require('express');
const router = express.Router();
const interviewService = require('./interview.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    interviewService
        .getAll()
        .then(interviews => res.json(interviews))
        .catch(err => next(err));
}

function getById(req, res, next) {
    interviewService
        .getById(req.params.id)
        .then(interview =>
            interview ? res.json(interview) : res.sendStatus(404)
        )
        .catch(err => next(err));
}

function create(req, res, next) {
    interviewService
        .create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    interviewService
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    interviewService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
