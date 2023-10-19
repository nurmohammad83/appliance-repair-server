import { NextFunction, Request, Response } from 'express';
import { authServices } from './auth.service';
import config from '../../../config';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body;
    const result = await authServices.loginUser(loginData);
    const { refreshToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.send({
      statusCode: 200,
      success: true,
      message: 'User logged in successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    const result = await authServices.refreshToken(token!);
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.send({
      statusCode: 200,
      success: true,
      message: ' refreshed token successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authControllers = { loginUser, refreshToken };
