import joi from "joi"

export const EquipmentValidations = (equipment) => {
    const schema = joi.object({
        name: joi.string().min(3).max(255).required().messages({
            "string.empty": "Equipment name is required.",
            "any.required": "Equipment name is required.",
            "string.base": "Equipment name should be a type of 'text'.",
            "string.min": "Equipment name should have a minimum length of {#limit}.",
            "string.max": "Equipment name should have a maximum length of {#limit}.",
        }),
        price: joi.number().positive().required().messages({
            "number.positive": `Price can not be negative value.`,
            "any.required": `Please enter equipment price.`,
            "number.base": `Please enter equipment price.`,
        }),
        quantity: joi.number().positive().required().messages({
            "number.positive": `Quantity can not be negative value.`,
            "any.required": `Quantity is required.`,
            "number.base": `Quantity is required.`,
        }),
        description: joi.string().min(15).max(255).required().messages({
            "string.empty": "Equipment description is required.",
            "any.required": "Equipment description is required.",
            "string.min": "Equipment description should have a minimum length of {#limit}.",
            "string.max": "Equipment description should have a maximum length of {#limit}.",
        }),
        image: joi.string().messages({
            "string.empty": "Please add image for equipment.",
            "any.required": "Please add image for equipment.",
        }),
    });

    const result = schema.validate(equipment);

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