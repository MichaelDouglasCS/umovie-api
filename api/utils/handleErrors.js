
// USER ERRORS

const emailAlreadyExists = () => {
    let error = {
        success: false,
        code: "email-already-exists",
        message: "This email already exists. You must pass another one!"
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
    usernameAlreadyExists: usernameAlreadyExists
};