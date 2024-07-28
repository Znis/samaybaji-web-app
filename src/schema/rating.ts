import joi from 'joi';
import { ReviewTargetType } from '../enums/review';

export const getRatingQuerySchema = joi.object({
  targetType: joi
    .string()
    .valid(ReviewTargetType.DISH, ReviewTargetType.RESTAURANT)
    .required()
    .messages({
      'string.base': 'Target type must be a string.',
      'string.empty': 'Target type cannot be empty.',
      'any.required': 'Target type is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
export const getRatingByTargetIDQuerySchema = joi.object({
  targetType: joi
    .string()
    .valid(ReviewTargetType.DISH, ReviewTargetType.RESTAURANT)
    .required()
    .messages({
      'string.base': 'Target type must be a string.',
      'string.empty': 'Target type cannot be empty.',
      'any.required': 'Target type is required.',
    })
    .options({
      stripUnknown: true,
    }),
  targetID: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Target ID must be a string.',
    'string.guid': 'Target ID must be a valid UUID.',
    'any.required': 'Target ID is required.',
  }),
});
export const createOrEditRatingBodySchema = joi.object({
  targetType: joi
    .string()
    .valid(ReviewTargetType.DISH, ReviewTargetType.RESTAURANT)
    .required()
    .messages({
      'string.base': 'Target type must be a string.',
      'string.empty': 'Target type cannot be empty.',
      'any.required': 'Target type is required.',
    }),

  rating: joi
    .number()
    .valid(1, 2, 3, 4, 5)
    .required()
    .messages({
      'number.base': 'Rating must be a number.',
      'any.required': 'Rating is required.',
    })
    .options({
      stripUnknown: true,
    }),
});

export const createOrEditRatingQuerySchema = joi.object({
  targetID: joi
    .string()
    .guid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.base': 'Target ID must be a string.',
      'string.guid': 'Target ID must be a valid UUID.',
      'any.required': 'Target ID is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
