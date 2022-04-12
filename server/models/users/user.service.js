const config = require('../../config.json');
const { OAuth2Client } = require('google-auth-library');
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
    googleAuthenticate,
    delete: _delete,
};

function removeCollections(user) {
    const { applications, contacts, interviews, ...rest } = user;
    return rest;
}

function generateToken(id) {
    return jwt.sign({ sub: id }, config.secret);
}

async function authenticate({ email, password }) {
    const _user = await User.findOne({ email });

    if (_user && bcrypt.compareSync(password, _user.hash)) {
        const user = removeCollections(_user.toObject());
        const { hash, ...userWithoutHash } = user;
        const token = generateToken(user._id);
        return {
            user: userWithoutHash,
            token,
        };
    }
}

async function googleAuthenticate(token) {
    // Verify token
    const client = new OAuth2Client(process.env.CLIENT_ID);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;

    // If user already exists, return user
    const user = await User.findOne({ email: email });
    if (user) {
        const token = generateToken(user._id);
        return {
            user: user,
            token: token,
        };
    } else {
        const newUserParams = {
            email: email,
            fullName: payload.name,
            profileImage: payload.picture,
            settings: {
                isDarkMode: false,
                defaultApplicationDisplayStyle: 'Card',
            },
        };

        try {
            let _user;
            // upload profile image to cloudinary
            if (newUserParams.profileImage) {
                const result = await cloudinary.uploader.upload(newUserParams.profileImage, {
                    public_id: `${newUserParams.email}_avatar`,
                });
                _user = new User({
                    ...newUserParams,
                    profileImage: result.secure_url,
                    cloudinary_id: result.public_id,
                });
            } else {
                _user = new User(newUserParams);
            }

            await _user.save();
            const token = generateToken(_user._id);

            return {
                user: _user,
                token: token,
            };
        } catch (error) {
            throw Error(error);
        }
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
    if (await User.findOne({ email: userParam.email })) {
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
        const token = userWithoutHash._id;

        return {
            user: userWithoutHash,
            token: token,
        };
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
