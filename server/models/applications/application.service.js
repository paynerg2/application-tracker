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
    return user.applications;
}

async function getById(id, token) {
    const { user } = await userService.getUser(token);
    return user.applications.find((a) => a._id === id);
}

async function create(applicationParam, token) {
    const { user } = await userService.getUser(token);

    user.applications.push(applicationParam);
    await user.save();

    return user;
}

async function update(id, applicationParam, token) {
    const { user } = await userService.getUser(token);

    const index = user.applications.findIndex((a) => a.id === id);
    if (index < 0) throw Error('Application not found');

    user.applications.set(index, { id, ...applicationParam });

    user.markModified('applications');
    await user.save();

    return user;
}

async function _delete(id, token) {
    const { user } = await userService.getUser(token);
    user.applications = user.applications.filter((app) => app.id !== id);
    await user.save();

    return user;
}
