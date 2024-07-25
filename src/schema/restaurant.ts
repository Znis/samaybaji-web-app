import joi from 'joi';

const minPhoneNumberLength = 10;
const maxPhoneNumberLength = 14;

export const getRestaurantByUserEmailQuerySchema = joi
  .object({
    email: joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be valid format',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const createRestaurantBodySchema = joi.object({
  name: joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be less than 100 characters long.',
    'any.required': 'Name is required.',
  }),
  description: joi.string().max(500).required().allow(''),
  location: joi.string().max(255).required().messages({
    'string.base': 'Location must be a string.',
    'string.max': 'Location must be less than 255 characters long.',
    'any.required': 'Location is required.',
  }),
  contactNumber: joi
    .string()
    .min(minPhoneNumberLength)
    .max(maxPhoneNumberLength)
    .pattern(/^\+?[0-9]{7,15}$/)
    .required()
    .messages({
      'string.base': 'Contact number must be a string.',
      'string.pattern.base':
        'Contact number must be a valid phone number, optionally starting with a +.',
      'any.required': 'Contact number is required.',
    }),
  openHours: joi.string().max(100).required().messages({
    'string.base': 'Open hours must be a string.',
    'string.max': 'Open hours must be less than 100 characters long.',
    'any.required': 'Open hours are required.',
  }),
  profilePic: joi.string().required().allow('').messages({
    'string.base': 'Profile pic image src must be a uri.',
  }),
  coverPic: joi.string().required().allow('').messages({
    'string.base': 'Cover pic image src must be a uri.',
  }),
  panNumber: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'PAN number must be a string.',
      'string.length': 'PAN number must be exactly 10 digits long.',
      'string.pattern.base': 'PAN number must contain only digits.',
      'any.required': 'PAN number is required.',
    })

    .options({
      stripUnknown: true,
    }),
});
export const editRestaurantBodySchema = joi.object({
  name: joi.string().min(3).max(100).optional().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be less than 100 characters long.',
    'any.required': 'Name is required.',
  }),
  description: joi.string().max(500).optional().allow(''),
  location: joi.string().max(255).optional().messages({
    'string.base': 'Location must be a string.',
    'string.max': 'Location must be less than 255 characters long.',
    'any.required': 'Location is required.',
  }),
  contactNumber: joi
    .string()
    .min(minPhoneNumberLength)
    .max(maxPhoneNumberLength)
    .pattern(/^\+?[0-9]{7,15}$/)
    .optional()
    .messages({
      'string.base': 'Contact number must be a string.',
      'string.pattern.base':
        'Contact number must be a valid phone number, optionally starting with a +.',
      'any.required': 'Contact number is required.',
    }),
  openHours: joi.string().max(100).optional().messages({
    'string.base': 'Open hours must be a string.',
    'string.max': 'Open hours must be less than 100 characters long.',
    'any.required': 'Open hours are required.',
  }),
  profilePic: joi.string().optional().allow('').messages({
    'string.base': 'Profile pic image src must be a uri.',
  }),
  coverPic: joi.string().optional().allow('').messages({
    'string.base': 'Cover pic image src must be a uri.',
  }),
  panNumber: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      'string.base': 'PAN number must be a string.',
      'string.length': 'PAN number must be exactly 10 digits long.',
      'string.pattern.base': 'PAN number must contain only digits.',
      'any.required': 'PAN number is required.',
    })

    .options({
      stripUnknown: true,
    }),
});

export const createOrEditOrdeleteRestaurantQuerySchema = joi
  .object({
    userID: joi.string().required().messages({
      'any.required': 'User ID is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
