import { ModelError } from '../error/modelError';
import { ForbiddenError } from '../error/forbiddenError';
import AuthorizationService from '../services/authorize';
import loggerWithNameSpace from '../utils/logger';
import { NextFunction, Response } from 'express';
import { Request } from '../interfaces/authenticate';
import { Roles } from '../enums/roles';
import { SchemaError } from '../error/schemaError';

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

export function authorizeCRUD(route: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const currentUser = req.user!;
      const userRole = await AuthorizationService.getRoleId(currentUser.id!);

      if (userRole == Roles.SUPERADMIN) {
        if (route == 'users') {
          const userID = req.query.userID as string;
          if (!userID) {
            return next(new SchemaError('UserID is required'));
          }
        }
        if (route == 'restaurants') {
          const restaurantID = req.query.restaurantID as string;
          if (!restaurantID) {
            return next(new SchemaError('restaurantID is required'));
          }
        }
        if (route == 'menus') {
          const menuID = req.query.menuID as string;
          if (!menuID) {
            return next(new SchemaError('menuID is required'));
          }
        }
        if (route == 'menuItems') {
          const menuItemID = req.query.menuItemID as string;
          if (!menuItemID) {
            return next(new SchemaError('menuItemID is required'));
          }
        }
        console.log('admin', req.query);
        return next();
      }
      if (userRole == Roles.CUSTOMER_WITH_RESTAURANT) {
        const restaurantID = (await AuthorizationService.getRestaurantID(
          currentUser.id,
        )) as string;
        req.query.restaurantID = restaurantID;
        if (route == 'menus') {
          const menuID = await AuthorizationService.getMenuID(restaurantID);
          if (!menuID) {
            return next(new SchemaError('No menu found'));
          }
          req.query.menuID = menuID;
        }
      }
      const cartID = await AuthorizationService.getCartID(currentUser.id);

      req.query.cartID = cartID;
      req.query.userID = currentUser.id;
      console.log('customer', req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
}
