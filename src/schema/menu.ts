import joi from 'joi';

export const createMenuBodySchema = joi.object({
  name: joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be less than 100 characters long.',
    'any.required': 'Name is required.',
  }),
  description: joi
    .string()
    .max(500)
    .required()
    .allow('')

    .options({
      stripUnknown: true,
    }),
});
export const editMenuBodySchema = joi.object({
  name: joi.string().min(3).max(100).optional().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be less than 100 characters long.',
    'any.required': 'Name is required.',
  }),
  description: joi
    .string()
    .max(500)
    .optional()
    .allow('')

    .options({
      stripUnknown: true,
    }),
});

export const restaurantIDQuerySchema = joi
  .object({
    restaurantID: joi.string().optional().messages({
      'any.required': 'Restaurant ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const menuIDQuerySchema = joi
  .object({
    restaurantID: joi.string().required().messages({
      'any.required': 'Menu ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
