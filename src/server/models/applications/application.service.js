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
    await application.save();
}

async function update(id, applicationParam) {
    const application = Application.findById(id);

    if (!application) throw Error('Application not found');

    // copy parameters to application
    Object.assign(application, applicationParam);

    await application.save();
}

async function _delete(id) {
    await Application.findByIdAndRemove(id);
}
