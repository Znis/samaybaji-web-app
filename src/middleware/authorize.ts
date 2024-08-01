import { ModelError } from '../error/modelError';
import { ForbiddenError } from '../error/forbiddenError';
import AuthorizationService from '../services/authorize';
import loggerWithNameSpace from '../utils/logger';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import { Roles } from '../enums/roles';

const logger = loggerWithNameSpace('Authorize Middleware');

export function authorize(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = req.user!;
      const permissions = await AuthorizationService.getAssignedPermission(
        currentUser.id!,
      );
      if (!permissions!.includes(permission)) {
        logger.error('Operation not permitted');
        next(new ForbiddenError('Forbidden'));
        return;
      }
      next();
    } catch {
      logger.error('Permission Checking failed');
      next(new ModelError('Permission retrieval error'));
    }
  };
}

export async function authorizeCRUD(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = req.user!;
    const userRole = await AuthorizationService.getRoleId(currentUser.id!);

    if (userRole == Roles.SUPERADMIN) {
      return next();
    }
    if (userRole == Roles.CUSTOMER_WITH_RESTAURANT) {
      const restaurantId = (await AuthorizationService.getRestaurantId(
        currentUser.id,
      )) as string;
      req.query.restaurantId = restaurantId;
      const menuId = await AuthorizationService.getMenuId(restaurantId);
      if (menuId) {
        req.query.menuId = menuId;
      }
    }
    const cartId = await AuthorizationService.getCartId(currentUser.id);

    req.query.cartId = cartId;
    if (!req.query.userId) req.query.userId = currentUser.id;

    next();
  } catch (error) {
    next(error);
  }
}
