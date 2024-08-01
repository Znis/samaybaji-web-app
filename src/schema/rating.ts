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
export const getRatingByTargetIdQuerySchema = joi.object({
  targetId: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Target Id must be a string.',
    'string.guid': 'Target Id must be a valid UUId.',
    'any.required': 'Target Id is required.',
  }),
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

export const createOrEditOrDeleteRatingQuerySchema = joi.object({
  targetId: joi
    .string()
    .guid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.base': 'Target Id must be a string.',
      'string.guid': 'Target Id must be a valid UUId.',
      'any.required': 'Target Id is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
