import joi from 'joi';

const cartItemSchema = joi.object({
  menuItemId: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Menu Item Id must be a string.',
    'string.guid': 'Menu Item Id must be a valid UUId.',
    'any.required': 'Menu Item Id is required.',
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
  quantity: joi.number().integer().min(1).optional().messages({
    'number.base': 'Quantity must be a number.',
    'number.integer': 'Quantity must be an integer.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is required.',
  }),
});

export const cartIdQuerySchema = joi
  .object({
    cartId: joi.string().optional().messages({
      'any.required': 'Cart Id is required',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const cartItemIdQuerySchema = joi
  .object({
    cartItemId: joi.string().required().messages({
      'any.required': 'Cart item Id is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
export default cartItemArraySchema;
