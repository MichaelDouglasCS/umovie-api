const User = require('../models/User');
const handleErrors = require('../utils/handleErrors');
const uuid = require('uuid');
const controller = {};

controller.register = async (req, res) => {

    const emailAlreadyExists = await User.findOne({ email: req.body.email });
    const usernameAlreadyExists = await User.findOne({ username: req.body.username });

    if (emailAlreadyExists) {
        return res.status(400).json(handleErrors.emailAlreadyExists());
    } else if (usernameAlreadyExists) {
        return res.status(400).json(handleErrors.usernameAlreadyExists());
    }

    const user = new User({
        id: uuid.v4(),
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        username: req.body.username,
        birthdate: req.body.birthdate
    });

    try {
        const savedUser = await user.save();
        res.status(200).json(savedUser);
    } catch(err) {
        res.status(400).json(err);
    }
};

module.exports = controller;