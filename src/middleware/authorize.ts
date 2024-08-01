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
      const restaurantID = (await AuthorizationService.getRestaurantID(
        currentUser.id,
      )) as string;
      req.query.restaurantID = restaurantID;
      const menuID = await AuthorizationService.getMenuID(restaurantID);
      if (menuID) {
        req.query.menuID = menuID;
      }
    }
    const cartID = await AuthorizationService.getCartID(currentUser.id);

    req.query.cartID = cartID;
    if (!req.query.userID) req.query.userID = currentUser.id;

    next();
  } catch (error) {
    next(error);
  }
}
