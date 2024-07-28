import joi from 'joi';
import { ReviewTargetType } from '../enums/review';

export const getReviewQuerySchema = joi.object({
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
export const getReviewByTargetIDQuerySchema = joi.object({
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
export const createOrEditReviewBodySchema = joi.object({
  targetType: joi
    .string()
    .valid(ReviewTargetType.DISH, ReviewTargetType.RESTAURANT)
    .required()
    .messages({
      'string.base': 'Target type must be a string.',
      'string.empty': 'Target type cannot be empty.',
      'any.required': 'Target type is required.',
    }),

  comment: joi
    .string()
    .min(1)
    .max(500)
    .required()
    .messages({
      'string.base': 'Comment must be a string.',
      'any.required': 'Comment is required.',
    })
    .options({
      stripUnknown: true,
    }),
});

export const createOrEditReviewQuerySchema = joi.object({
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
