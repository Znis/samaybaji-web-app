import joi from 'joi';

export const userIDQuerySchema = joi
  .object({
    userID: joi.string().optional().messages({
      'any.required': 'User ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const cartIDQuerySchema = joi
  .object({
    cartID: joi.string().required().messages({
      'any.required': 'Cart ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
