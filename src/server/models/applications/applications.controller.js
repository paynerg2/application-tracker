const express = require('express');
const router = express.Router();
const applicationService = require('./application.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    applicationService
        .getAll()
        .then(applications => res.json(applications))
        .catch(err => next(err));
}

function getById(req, res, next) {
    // respond with 404 if application not found
    applicationService
        .getById(req.params.id)
        .then(application =>
            application ? res.json(application) : res.sendStatus(404)
        )
        .catch(err => next(err));
}

function create(req, res, next) {
    applicationService
        .create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    console.log('body from update request');
    console.log(req.body);
    console.log(`id: ${req.params.id}`);
    applicationService
        .update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    applicationService
        .delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
