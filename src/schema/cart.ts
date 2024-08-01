import joi from 'joi';

export const userIdQuerySchema = joi
  .object({
    userId: joi.string().optional().messages({
      'any.required': 'User Id is required',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const cartIdQuerySchema = joi
  .object({
    cartId: joi.string().required().messages({
      'any.required': 'Cart Id is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
