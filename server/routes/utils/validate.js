import joi from "joi";

function validateEmail(data) {
    let schema = joi.object({
        email: joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
}

function validatePassword(data) {
    let schema = joi.object({
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

export { validateEmail, validatePassword };
