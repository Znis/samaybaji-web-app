import { NextFunction, Request, Response } from 'express';
import loggerWithNameSpace from '../utils/logger';

const logger = loggerWithNameSpace('Auth Controller');

export async function login(req: Request, res: Response, next: NextFunction) {}

export async function refresh(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
