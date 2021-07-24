const User = require('../models/User');
const handleErrors = require('../utils/handleErrors');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const controller = {};

// REGISTER BY EMAIL
controller.register = async (req, res) => {

    const emailAlreadyExists = await User.findOne({ email: req.body.email });
    const usernameAlreadyExists = await User.findOne({ username: req.body.username });

    if (emailAlreadyExists) {
        return res.status(400).json(handleErrors.emailAlreadyExists());
    } else if (usernameAlreadyExists) {
        return res.status(400).json(handleErrors.usernameAlreadyExists());
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        id: uuid.v4(),
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        username: req.body.username,
        birthdate: req.body.birthdate,
        authenticationMethods: ['EMAIL']
    });

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(500).json(err);
    }
};

module.exports = controller;