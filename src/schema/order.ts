import joi from 'joi';
import { OrderStatus } from '../enums/order';

const minPhoneNumberLength = 10;
const maxPhoneNumberLength = 14;

export const createOrderSchema = joi.object({
  totalPrice: joi.number().positive().required().messages({
    'number.base': 'Total price must be a number.',
    'number.positive': 'Total price must be a positive number.',
    'any.required': 'Total price is required.',
  }),
  orderDate: joi.date().required().messages({
    'date.base': 'Order date must be a valid date.',
    'any.required': 'Order date is required.',
  }),
  orderTime: joi
    .string()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .required()
    .messages({
      'string.base': 'Order time must be a string.',
      'string.pattern.base': 'Order time must be in the format HH:mm.',
      'any.required': 'Order time is required.',
    }),
  paymentMethod: joi.string().valid('cod', 'online').required().messages({
    'string.base': 'Payment method must be a string.',
    'any.only': 'Payment method must be one of [cod, online].',
    'any.required': 'Payment method is required.',
  }),
  deliveryAddress: joi.string().required().messages({
    'string.base': 'Delivery address must be a string.',
    'any.required': 'Delivery address is required.',
  }),
  customerName: joi.string().required().messages({
    'string.base': 'Customer name must be a string.',
    'any.required': 'Customer name is required.',
  }),
  customerPhone: joi
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
  discountAmount: joi.number().positive().required().messages({
    'number.base': 'Discount amount must be a number.',
    'number.positive': 'Discount amount must be a positive number.',
    'any.required': 'Discount amount is required.',
  }),
  deliveryAmount: joi.number().positive().required().messages({
    'number.base': 'Delivery amount must be a number.',
    'number.positive': 'Delivery amount must be a positive number.',
    'any.required': 'Delivery amount is required.',
  }),
  totalAmount: joi.number().positive().required().messages({
    'number.base': 'Total amount must be a number.',
    'number.positive': 'Total amount must be a positive number.',
    'any.required': 'Total amount is required.',
  }),
  notes: joi.string().optional().allow('').messages({
    'string.base': 'Notes must be a string.',
  }),
});

export const editOrderByCustomerSchema = joi.object({
  totalPrice: joi.number().positive().optional().messages({
    'number.base': 'Total price must be a number.',
    'number.positive': 'Total price must be a positive number.',
    'any.required': 'Total price is required.',
  }),
  orderDate: joi.date().optional().messages({
    'date.base': 'Order date must be a valid date.',
    'any.required': 'Order date is required.',
  }),
  orderTime: joi
    .string()
    .pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
    .optional()
    .messages({
      'string.base': 'Order time must be a string.',
      'string.pattern.base': 'Order time must be in the format HH:mm.',
      'any.required': 'Order time is required.',
    }),
  paymentMethod: joi.string().valid('cod', 'online').optional().messages({
    'string.base': 'Payment method must be a string.',
    'any.only': 'Payment method must be one of [cod, online].',
    'any.required': 'Payment method is required.',
  }),
  deliveryAddress: joi.string().optional().messages({
    'string.base': 'Delivery address must be a string.',
    'any.required': 'Delivery address is required.',
  }),
  customerName: joi.string().optional().messages({
    'string.base': 'Customer name must be a string.',
    'any.required': 'Customer name is required.',
  }),
  customerPhone: joi
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

  totalAmount: joi.number().positive().optional().messages({
    'number.base': 'Total amount must be a number.',
    'number.positive': 'Total amount must be a positive number.',
    'any.required': 'Total amount is required.',
  }),
  notes: joi.string().optional().allow('').messages({
    'string.base': 'Notes must be a string.',
  }),
});
export const editOrderByAdminSchema = joi.object({
  status: joi
    .string()
    .valid(
      OrderStatus.PENDING,
      OrderStatus.COOKING,
      OrderStatus.READY,
      OrderStatus.EN_ROUTE,
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED,
    )
    .required()
    .messages({
      'string.base': 'Status must be a string.',
      'any.only':
        'Status must be one of [pending, cooking, ready, en_route, delivered, cancelled].',
      'any.required': 'Status is required.',
    }),
});
