import joi from 'joi';

const cartItemSchema = joi.object({
  menuItemID: joi.string().guid({ version: 'uuidv4' }).required().messages({
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
const cartItemArraySchema = joi.array().items(cartItemSchema).messages({
  'array.base': 'Cart items must be an array.',
  'array.includes': 'Each item in the cart must be a valid cart item.',
});

export const editCartItemSchema = joi.object({
  menuItemID: joi.string().guid({ version: 'uuidv4' }).optional().messages({
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

export const cartIDQuerySchema = joi
  .object({
    cartID: joi.string().optional().messages({
      'any.required': 'Cart ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const cartItemIDQuerySchema = joi
  .object({
    cartItemID: joi.string().required().messages({
      'any.required': 'Cart item ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
export default cartItemArraySchema;
