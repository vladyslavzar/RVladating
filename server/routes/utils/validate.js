import joi from "joi";

function validate(data) {
    let schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}

export default validate;
