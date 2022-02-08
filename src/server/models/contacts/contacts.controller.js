const express = require('express');
const router = express.Router();
const contactService = require('./contact.service');

// routes
router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    contactService
        .getAll(req.headers.authorization)
        .then((contacts) => res.json(contacts))
        .catch((err) => next(err));
}

function create(req, res, next) {
    contactService
        .create(req.body, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}

function update(req, res, next) {
    contactService
        .update(req.params.id, req.body, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}

function _delete(req, res, next) {
    contactService
        .delete(req.params.id, req.headers.authorization)
        .then((user) => res.json(user))
        .catch((err) => next(err));
}
