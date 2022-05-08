import joi from "joi"

export const equipmentsValidation = (equipments) => {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required().messages({
            "string.empty": "Equipment name is required.",
            "any.required": "Equipment name is required.",
            "string.base": "Equipment name should be a type of 'text'.",
            "string.min": "Equipment name should have a minimum length of {#limit}.",
            "string.max": "Equipment name should have a maximum length of {#limit}.",
        }),
        equipmentId: joi.string().min(4).max(255).required().messages({
            "string.empty": "Equipment Id is required.",
            "any.required": "Equipment Id is required.",
            "string.min": "Equipment Id should have a minimum length of {#limit}.",
            "string.max": "Equipment Id should have a maximum length of {#limit}.",
        }),
        country: joi.string().min(3).max(255).required().messages({
            "string.empty": "Country is required.",
            "any.required": "Country is required.",
            "string.base": "Country should be a type of 'text'.",
            "string.min": "Country should have a minimum length of {#limit}.",
            "string.max": "Country should have a maximum length of {#limit}.",
        }),
        SalesCount: joi.number().positive().required().messages({
            "number.positive": `SalesCount can not be negative value.`,
            "any.required": `Please enter SalesCount .`,
            "number.base": `Please enter SalesCount .`,
        }),
        
        image: joi.string().messages({
            "string.empty": "Equipment image is required.",
            "any.required": "Equipment image is required.",
        }),
    });

    const result = schema.validate(equipments);

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