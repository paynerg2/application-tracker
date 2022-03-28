const userService = require('../users/user.service');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(token) {
    const { user } = await userService.getUser(token);
    return user.interviews;
}

async function getById(id, token) {
    const { user } = await userService.getUser(token);
    return user.interviews.find((i) => i.id === id);
}

async function create(interviewParam, token) {
    const { user } = await userService.getUser(token);

    user.interviews.push(interviewParam);
    await user.save();

    return user;
}

async function update(id, interviewParam, token) {
    const { user } = await userService.getUser(token);

    const index = user.interviews.findIndex((i) => i.id === id);
    if (index < 0) throw Error('Interview not found');

    user.interviews.set(index, { id, ...interviewParam });

    user.markModified('interviews');
    await user.save();

    return user;
}

async function _delete(id, token) {
    const { user } = await userService.getUser(token);
    user.interviews = user.interviews.filter((i) => i.id !== id);

    await user.save();

    return user;
}
