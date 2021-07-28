const bcrypt = require('bcryptjs');
const config = require('config');
const controller = {};
const handleErrors = require('../utils/handleErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const uuid = require('uuid');

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

    const newUser = new User({
        id: uuid.v4(),
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        username: req.body.username,
        birthdate: req.body.birthdate,
        authenticationMethods: ['EMAIL']
    });

    try {
        const savedUser = await newUser.save();
        const token = generateTokenByUser(savedUser);
        
        res.status(200).json({ token: token, user: savedUser });
    } catch(error) {
        res.status(500).json(error);
    }
};

// LOGIN BY EMAIL
controller.login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json(handleErrors.emailNotExist());

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).json(handleErrors.invalidPassword());

    const token = generateTokenByUser(user);

    res.status(200).json({ token: token, user: user });
};

// GENERATE TOKEN
generateTokenByUser = function(user) {
    const payload = { id: user.id, email: user.email };
    const secretKey = process.env.TOKEN_SECRET || config.get('server.tokenSecret');
    const token = jwt.sign(payload, secretKey);
    return token;
};

module.exports = controller;