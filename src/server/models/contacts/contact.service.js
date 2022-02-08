const userService = require('../users/user.service');

module.exports = {
    getAll,
    create,
    update,
    delete: _delete,
};

async function getAll(token) {
    const { user } = await userService.getUser(token);
    return user.contacts;
}

async function create(contactParam, token) {
    const { user } = await userService.getUser(token);

    user.contacts.push(contactParam);
    await user.save();

    return user;
}

async function update(id, contactParam, token) {
    const { user } = await userService.getUser(token);

    const index = user.contacts.findIndex((c) => c.id === id);
    if (!index) throw Error('Contact not found');

    user.contacts = user.contacts.map((contact) => (contact.id === id ? contactParam : contact));
    await user.save();

    return user;
}

async function _delete(id, token) {
    const { user } = await userService.getUser(token);

    user.contacts = user.contacts.filter((contact) => contact.id !== id);
    await user.save();

    return user;
}
