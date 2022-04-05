const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../_helpers/db');
const cloudinary = require('../../_helpers/cloudinary');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    getUser,
    create,
    update,
    updateWithoutImage,
    delete: _delete,
};

function removeCollections(user) {
    const { applications, contacts, interviews, ...rest } = user;
    return rest;
}

async function authenticate({ email, password }) {
    const _user = await User.findOne({ email });

    if (_user && bcrypt.compareSync(password, _user.hash)) {
        const user = removeCollections(_user.toObject());
        const { hash, ...userWithoutHash } = user;
        const token = jwt.sign({ sub: user._id }, config.secret);
        return {
            user: userWithoutHash,
            token,
        };
    }
}

async function getUser(bearerHeader) {
    if (!bearerHeader) return { user: null };
    try {
        const token = bearerHeader.replace('Bearer ', '');
        const decodedToken = jwt.verify(token, config.secret);
        const user = await User.findById(decodedToken.sub);

        return {
            user,
        };
    } catch (error) {
        return { user: null };
    }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.email })) {
        throw Error('Email "' + userParam.email + '" is already taken');
    }

    try {
        // upload profile image to cloudinary
        let user;
        if (userParam.profileImage) {
            const result = await cloudinary.uploader.upload(userParam.profileImage, {
                public_id: `${userParam.email}_avatar`,
            });
            user = new User({
                ...userParam,
                profileImage: result.secure_url,
                cloudinary_id: result.public_id,
            });
        } else {
            user = new User(userParam);
        }

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }

        // save user
        await user.save();

        const { hash, ...userWithoutHash } = user;
        return userWithoutHash;
    } catch (error) {
        throw Error(error);
    }
}

async function update(id, userParam) {
    let _user;
    try {
        // upload profile image to cloudinary, replacing the old profile image
        if (userParam.profileImage) {
            const result = await cloudinary.uploader.upload_large(userParam.profileImage, {
                public_id: `${userParam.email}_avatar`,
                overwrite: true,
                invalidate: true,
            });
            _user = {
                ...userParam,
                profileImage: result.secure_url,
                cloudinary_id: result.public_id,
            };
        } else {
            _user = userParam;
        }
    } catch (error) {
        throw Error(error);
    }
    return await User.findByIdAndUpdate(id, _user, { new: true });
}

async function updateWithoutImage(id, userParams) {
    return await User.findByIdAndUpdate(id, userParams, { new: true });
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
