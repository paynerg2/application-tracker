const db = require('../../_helpers/db');
const Interview = db.Interview;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Interview.find();
}

async function getById(id) {
    return await Interview.findById(id);
}

async function create(interviewParam) {
    const interview = new Interview(interviewParam);
    await interview.save();
}

async function update(id, interviewParam) {
    const interview = await Interview.findById(id);

    if (!interview) throw Error('Interview not found');

    Object.assign(interview, interviewParam);

    await interview.save();
}

async function _delete(id) {
    await Interview.findByIdAndRemove(id);
}
