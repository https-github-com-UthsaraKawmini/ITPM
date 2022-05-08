import joi from "joi"

export const customerValidations = (customer) => {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required().messages({
            "string.empty": "User Name is required.",
            "any.required": "User Name is required.",
            "string.base": "User Name should be a type of 'text'.",
            "string.min": "User Name should have a minimum length of {#limit}.",
            "string.max": "User Name should have a maximum length of {#limit}.",
        }),
        email: joi.string().max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'lk'] } }).messages({
            "string.empty": "User Email is required.",
            "any.required": "User Email is required.",
            "string.email": "Please enter a valid email.",
            "string.domain": "Please enter a valid email domain.",
            "string.max": `User Email should have a maximum length of {#limit}.`,
        }),
        password: joi.string().min(6).max(16).required().messages({
            "string.empty": "User password is required.",
            "any.required": "User password is required.",
            "string.min": "User password should have a minimum length of {#limit}.",
            "string.max": "User password should have a maximum length of {#limit}.",
        }),
        mobile: joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
            "string.empty": "User mobile is required.",
            "any.required": "User mobile is required.",
            "string.pattern.base": "User mobile should only contain numbers",
            "string.length": "User mobile length shoud be 10.",
        }),
        birthDate: joi.string().required().messages({
            "any.required": "User birth day is required.",
            "string.empty": "User birth day is required.",
        }),
        gender: joi.string().required().messages({
            "string.empty": "User gender is required.",
            "any.required": "User gender is required.",
        }),
        image: joi.string().messages({
            "string.empty": "User image is required.",
            "any.required": "User image is required.",
        }),
    });

    const result = schema.validate(customer);

    if (result.error) {
        return {
            status: false,
            error: result.error.message,
        }
    } else {
        return {
            status: true
        }
    }
};

export const customerSignInValidations = (customer) => {
    const schema = joi.object({
        email: joi.string().max(255).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'lk'] } }).messages({
            "string.empty": "User Email is required.",
            "any.required": "User Email is required.",
            "string.email": "Please enter a valid email.",
            "string.domain": "Please enter a valid email domain.",
            "string.max": `User Email should have a maximum length of {#limit}.`,
        }),
        password: joi.string().min(6).max(16).required().messages({
            "string.empty": "User password is required.",
            "any.required": "User password is required.",
            "string.min": "User password should have a minimum length of {#limit}.",
            "string.max": "User password should have a maximum length of {#limit}.",
        }),
    });

    const result = schema.validate(customer);

    if (result.error) {
        return {
            status: false,
            error: result.error.message,
        }
    } else {
        return {
            status: true
        }
    }
};