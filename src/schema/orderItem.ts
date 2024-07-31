import joi from 'joi';
import { OrderItemStatus } from '../enums/order';

export const createOrderItemSchema = joi.object({
  menuItemID: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Menu Item ID must be a string.',
    'string.guid': 'Menu Item ID must be a valid UUID.',
    'any.required': 'Menu Item ID is required.',
  }),
  quantity: joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number.',
    'number.integer': 'Quantity must be an integer.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is required.',
  }),
  unitPrice: joi
    .number()
    .positive()
    .required()
    .messages({
      'number.base': 'Unit price must be a number.',
      'number.positive': 'Unit price must be a positive number.',
      'any.required': 'Unit price is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
export const createOrderItemArraySchema = joi
  .array()
  .items(createOrderItemSchema)
  .messages({
    'array.base': 'Cart items must be an array.',
    'array.includes': 'Each item in the cart must be a valid cart item.',
  });
export const editOrderItemByCustomerSchema = joi.object({
  orderItemID: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Order item ID must be a string.',
    'string.guid': 'Order item ID must be a valid UUID.',
    'any.required': 'Order item ID is required.',
  }),
  quantity: joi.number().integer().min(1).optional().messages({
    'number.base': 'Quantity must be a number.',
    'number.integer': 'Quantity must be an integer.',
    'number.min': 'Quantity must be at least 1.',
    'any.required': 'Quantity is required.',
  }),
  unitPrice: joi
    .number()
    .positive()
    .optional()
    .messages({
      'number.base': 'Unit price must be a number.',
      'number.positive': 'Unit price must be a positive number.',
      'any.required': 'Unit price is required.',
    })
    .options({
      stripUnknown: true,
    }),
});

export const editOrderItemByRestaurantSchema = joi.object({
  orderItemID: joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.base': 'Order ID must be a string.',
    'string.guid': 'Order ID must be a valid UUID.',
    'any.required': 'Order ID is required.',
  }),
  status: joi
    .string()
    .valid(
      OrderItemStatus.PENDING,
      OrderItemStatus.COOKING,
      OrderItemStatus.READY,
      OrderItemStatus.CANCELLED,
    )
    .optional()
    .messages({
      'string.base': 'Status must be a string.',
      'any.only': 'Status must be one of [pending, cooking, ready, cancelled].',
      'any.required': 'Status is required.',
    })
    .options({
      stripUnknown: true,
    }),
});
