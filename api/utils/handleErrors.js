
// USER ERRORS

const emailAlreadyExists = () => {
    let error = {
        success: false,
        code: "email-already-exists",
        message: "Oops, The email already exists!"
    };

    return error;
};

const emailNotExist = () => {
    let error = {
        success: false,
        code: "email-not-exist",
        message: "Oops, The email doesn't exist!"
    };

    return error;
};

const invalidPassword = () => {
    let error = {
        success: false,
        code: "invalid-password",
        message: "Oops, The password isn't correct!"
    };

    return error;
};

const usernameAlreadyExists = () => {
    let error = {
        success: false,
        code: "username-already-exists",
        message: "This username already exists. You must pass another one!"
    };

    return error;
};

module.exports = {
    emailAlreadyExists: emailAlreadyExists,
    emailNotExist: emailNotExist,
    invalidPassword: invalidPassword,
    usernameAlreadyExists: usernameAlreadyExists
};