import joi from 'joi';

const minPasswordLength = 4;
const minPhoneNumberLength = 10;
const maxPhoneNumberLength = 14;

export const getUserByEmailQuerySchema = joi
  .object({
    email: joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be valid format',
    }),
  })
  .options({
    stripUnknown: true,
  });

export const createUserBodySchema = joi.object({
  name: joi.string().required().messages({
    'any.required': 'Name is required',
  }),

  email: joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be valid format',
  }),
  phoneNumber: joi
    .string()
    .min(minPhoneNumberLength)
    .max(maxPhoneNumberLength)
    .pattern(/^\+?\d+$/)
    .required()
    .messages({
      'any.required': 'Phone Number is required',
      'string.pattern.base': 'Phone Number must be valid format',
      'string.min': 'Phone Number must be at least 10 characters',
      'string.max': 'Phone Number must be at most 14 characters',
    }),

  password: joi
    .string()
    .required()
    .min(minPasswordLength)
    .messages({
      'any.required': 'password is required',
      'string.min': 'Password must be at least 4 characters',
      'password.uppercase':
        'Password must have at least one uppercase character',
      'password.lowercase':
        'Password must have at least one lowercase character',
      'password.special': 'Password must have at least one special character',
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error('password.uppercase');
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error('password.lowercase');
      }
      if (!/[!@#$%^&*()_+]/.test(value)) {
        return helpers.error('password.special');
      }

      return value;
    })
    .options({
      stripUnknown: true,
    }),
});
export const editUserBodySchema = joi.object({
  name: joi.string().optional().messages({
    'any.required': 'Name is required',
  }),

  email: joi.string().email().optional().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be valid format',
  }),
  phoneNumber: joi
    .string()
    .min(minPhoneNumberLength)
    .max(maxPhoneNumberLength)
    .pattern(/^\+?\d+$/)
    .optional()
    .messages({
      'any.required': 'Phone Number is required',
      'string.pattern.base': 'Phone Number must be valid format',
      'string.min': 'Phone Number must be at least 10 characters',
      'string.max': 'Phone Number must be at most 14 characters',
    }),

  password: joi
    .string()
    .optional()
    .min(minPasswordLength)
    .messages({
      'any.required': 'password is required',
      'string.min': 'Password must be at least 4 characters',
      'password.uppercase':
        'Password must have at least one uppercase character',
      'password.lowercase':
        'Password must have at least one lowercase character',
      'password.special': 'Password must have at least one special character',
    })
    .custom((value, helpers) => {
      if (!/[A-Z]/.test(value)) {
        return helpers.error('password.uppercase');
      }
      if (!/[a-z]/.test(value)) {
        return helpers.error('password.lowercase');
      }
      if (!/[!@#$%^&*()_+]/.test(value)) {
        return helpers.error('password.special');
      }

      return value;
    })
    .options({
      stripUnknown: true,
    }),
});

export const editOrdeleteUserQuerySchema = joi
  .object({
    id: joi.string().required().messages({
      'any.required': 'id is required',
    }),
  })
  .options({
    stripUnknown: true,
  });
