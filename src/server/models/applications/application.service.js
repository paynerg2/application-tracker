const db = require('../../_helpers/db');
const Application = db.Application;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Application.find();
}

async function getById(id) {
    return await Application.findById(id);
}

async function create(applicationParam) {
    const application = new Application(applicationParam);
    const newApplication = await application.save();
    return newApplication;
}

async function update(id, applicationParam) {
    const applicationInDatabase = await Application.findById(id);
    if (!applicationInDatabase) throw Error('Application not found');

    const updatedApplication = new Application(applicationParam);
    await Application.findByIdAndUpdate(id, updatedApplication);
}

async function _delete(id) {
    await Application.findByIdAndRemove(id);
}
