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
    const interviewInDatabase = await Interview.findById(id);
    if (!interviewInDatabase) throw Error('Interview not found');

    const updatedInterview = new Interview(interviewParam);
    await Interview.findByIdAndUpdate(id, updatedInterview);
}

async function _delete(id) {
    await Interview.findByIdAndRemove(id);
}
