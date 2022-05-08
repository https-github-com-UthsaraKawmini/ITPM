import joi from "joi"

export const signUpValidations = (user) => {
    const schema = joi.object({
        userName: joi.string().min(3).max(255).required().messages({
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
            "string.length": "User mobile length should be 10.",
        }),
        address: joi.string().min(6).required().messages({
            "string.empty": "Delivery address is required.",
            "any.required": "Delivery address is required.",
            "string.min": "Delivery address should have a minimum length of {#limit}.",
        }),
        userType: joi.string().required().messages({
            "string.empty": "Status is required.",
            "any.required": "Status is required.",
        }),
        image: joi.string().messages({
            "string.empty": "User image is required.",
            "any.required": "User image is required.",
        }),
    });

    const result = schema.validate(user);

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

export const signInValidations = (user) => {
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

    const result = schema.validate(user);

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

export const updateUserValidations = (user) => {
    const schema = joi.object({
        userName: joi.string().min(3).max(255).required().messages({
            "string.empty": "User Name is required.",
            "any.required": "User Name is required.",
            "string.base": "User Name should be a type of 'text'.",
            "string.min": "User Name should have a minimum length of {#limit}.",
            "string.max": "User Name should have a maximum length of {#limit}.",
        }),
        mobile: joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
            "string.empty": "User mobile is required.",
            "any.required": "User mobile is required.",
            "string.pattern.base": "User mobile should only contain numbers",
            "string.length": "User mobile length should be 10.",
        }),
        address: joi.string().min(6).required().messages({
            "string.empty": "Delivery address is required.",
            "any.required": "Delivery address is required.",
            "string.min": "Delivery address should have a minimum length of {#limit}.",
        }),
        image: joi.string().messages({
            "string.empty": "User image is required.",
            "any.required": "User image is required.",
        }),
    });

    const result = schema.validate(user);

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