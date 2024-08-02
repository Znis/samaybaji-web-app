import joi from 'joi';
import { ReviewTargetType } from '../enums/review';

export const createReviewBodySchema = joi.object({
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
export const editReviewBodySchema = joi.object({
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

export const reviewCRParamsSchema = joi.object({
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
export const reviewUDParamsSchema = joi.object({
  reviewId: joi
    .string()
    .guid({ version: 'uuidv4' })
    .required()
    .messages({
      'string.base': 'Review Id must be a string.',
      'string.guid': 'Review Id must be a valid UUId.',
      'any.required': 'Review Id is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
