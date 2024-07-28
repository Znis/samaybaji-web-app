import joi from 'joi';

export const createDishBodySchema = joi.object({
  name: joi.string().min(1).max(255).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 1 character long.',
    'string.max': 'Name must be at most 255 characters long.',
    'any.required': 'Name is required.',
  }),
  description: joi.string().required().allow('').max(1000).messages({
    'string.base': 'Description must be a string.',
    'any.required': 'Description is required.',
    'string.max': 'Description must be at most 1000 characters long.',
  }),
  attributes: joi.array().items(joi.string()).required().messages({
    'array.base': 'Attributes must be an array of strings.',
    'any.required': 'Attributes list is required.',
    'string.base': 'Each attribute must be a string.',
  }),
  items: joi.array().items(joi.string()).required().messages({
    'array.base': 'Items must be an array of strings.',
    'any.required': 'Items list is required.',
    'string.base': 'Each item must be a string.',
  }),
  imgSrc: joi.string().uri().required().allow('').messages({
    'string.base': 'Image source must be a string.',
    'any.required': 'Image URI is required.',
    'string.uri': 'Image source must be a valid URI.',
  }),
  price: joi.number().positive().required().messages({
    'number.base': 'Price must be a number.',
    'number.positive': 'Price must be a positive number.',
    'any.required': 'Price is required.',
  }),
  portion: joi
    .string()
    .required()
    .allow('')
    .messages({
      'string.base': 'Portion must be a string.',
      'any.required': 'Portion is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
export const editDishBodySchema = joi.object({
  name: joi.string().min(1).max(255).optional().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 1 character long.',
    'string.max': 'Name must be at most 255 characters long.',
    'any.required': 'Name is required.',
  }),
  description: joi.string().optional().allow('').max(1000).messages({
    'string.base': 'Description must be a string.',
    'any.required': 'Description is required.',
    'string.max': 'Description must be at most 1000 characters long.',
  }),
  attributes: joi.array().items(joi.string()).optional().messages({
    'array.base': 'Attributes must be an array of strings.',
    'any.required': 'Attributes list is required.',
    'string.base': 'Each attribute must be a string.',
  }),
  items: joi.array().items(joi.string()).optional().messages({
    'array.base': 'Items must be an array of strings.',
    'any.required': 'Items list is required.',
    'string.base': 'Each item must be a string.',
  }),
  imgSrc: joi.string().uri().optional().allow('').messages({
    'string.base': 'Image source must be a string.',
    'any.required': 'Image URI is required.',
    'string.uri': 'Image source must be a valid URI.',
  }),
  price: joi.number().positive().optional().messages({
    'number.base': 'Price must be a number.',
    'number.positive': 'Price must be a positive number.',
    'any.required': 'Price is required.',
  }),
  portion: joi
    .string()
    .optional()
    .allow('')
    .messages({
      'string.base': 'Portion must be a string.',
      'any.required': 'Portion is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
export const getOrCreateDishQuerySchema = joi.object({
  menuItemID: joi
    .string()
    .guid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.base': 'Menu Item ID must be a string.',
      'string.guid': 'Menu Item ID must be a valid UUID.',
      'any.required': 'Menu Item ID is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
export const editOrDeleteDishQuerySchema = joi.object({
  dishID: joi
    .string()
    .guid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.base': 'Dish ID must be a string.',
      'string.guid': 'Dish ID must be a valid UUID.',
      'any.required': 'Dish ID is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
