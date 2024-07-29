import joi from 'joi';

export const createMenuItemBodySchema = joi.object({
  name: joi.string().min(1).max(255).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 1 character long.',
    'string.max': 'Name must be less than 255 characters long.',
    'any.required': 'Name is required.',
  }),
  portion: joi.string().max(255).required().messages({
    'string.base': 'Portion must be a string.',
    'string.max': 'Portion must be less than 255 characters long.',
  }),
  price: joi.number().integer().positive().required().messages({
    'number.base': 'Price must be a number.',
    'number.integer': 'Price must be an integer.',
    'number.positive': 'Price must be a positive number.',
    'any.required': 'Price is required.',
  }),
  imageSrc: joi.string().required().messages({
    'string.base': 'Image source must be a string.',
    'any.required': 'Image source is required.',
  }),
  isPopular: joi.boolean().required().messages({
    'boolean.base': 'Is popular must be a boolean.',
    'any.required': 'Is popular is required.',
  }),
  type: joi
    .string()
    .valid('Veg', 'Non-Veg', 'Liquor')
    .required()
    .messages({
      'string.base': 'Type must be a string.',
      'any.only': 'Type must be one of Veg, Non-Veg, or Liquor.',
      'any.required': 'Type is required.',
    })

    .options({
      stripUnknown: true,
    }),
});
export const editMenuItemBodySchema = joi.object({
  name: joi.string().min(1).max(255).optional().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 1 character long.',
    'string.max': 'Name must be less than 255 characters long.',
    'any.required': 'Name is required.',
  }),
  portion: joi.string().max(255).optional().messages({
    'string.base': 'Portion must be a string.',
    'string.max': 'Portion must be less than 255 characters long.',
  }),
  price: joi.number().integer().positive().optional().messages({
    'number.base': 'Price must be a number.',
    'number.integer': 'Price must be an integer.',
    'number.positive': 'Price must be a positive number.',
    'any.required': 'Price is required.',
  }),
  imageSrc: joi.string().optional().messages({
    'string.base': 'Image source must be a string.',
    'any.required': 'Image source is required.',
  }),
  isPopular: joi.boolean().optional().messages({
    'boolean.base': 'Is popular must be a boolean.',
    'any.required': 'Is popular is required.',
  }),
  type: joi.string().valid('Veg', 'Non-Veg', 'Liquor').optional().messages({
    'string.base': 'Type must be a string.',
    'any.only': 'Type must be one of Veg, Non-Veg, or Liquor.',
    'any.required': 'Type is required.',
  }),
  status: joi
    .string()
    .valid('In Stock', 'Out of Stock')
    .optional()
    .messages({
      'string.base': 'Status must be a string.',
      'any.only': 'Status must be either "In Stock" or "Out of Stock".',
      'any.required': 'Status is required.',
    })

    .options({
      stripUnknown: true,
    }),
});

export const menuIDQuerySchema = joi
  .object({
    menuID: joi.string().optional().messages({
      'any.required': 'Menu ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const menuItemIDQuerySchema = joi
  .object({
    menuItemID: joi.string().required().messages({
      'any.required': 'Menu Item ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
