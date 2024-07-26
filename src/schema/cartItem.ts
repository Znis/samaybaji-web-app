import joi from 'joi';

const cartItemSchema = joi.object({
  menu_item_id: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Menu Item ID must be a string.',
    'string.guid': 'Menu Item ID must be a valid UUID.',
    'any.required': 'Menu Item ID is required.',
  }),
  quantity: joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number.',
    'number.integer': 'Quantity must be an integer.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is required.',
  }),
});

export const editCartItemSchema = joi.object({
  menu_item_id: joi.string().guid({ version: 'uuidv4' }).optional().messages({
    'string.base': 'Menu Item ID must be a string.',
    'string.guid': 'Menu Item ID must be a valid UUID.',
    'any.required': 'Menu Item ID is required.',
  }),
  quantity: joi.number().integer().min(1).optional().messages({
    'number.base': 'Quantity must be a number.',
    'number.integer': 'Quantity must be an integer.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is required.',
  }),
});
export default cartItemSchema;
