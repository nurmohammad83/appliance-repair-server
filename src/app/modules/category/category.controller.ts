import { Request, Response } from 'express';

import { CategoryService } from './category.service';

import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import sendResponse from '../../../shared/sendResponse';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category created successfully',
    success: true,
    data: result,
  });
});

const getAllFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Categories fetched successfully',
    success: true,
    data: result,
  });
});

const getByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category fetched successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await CategoryService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category updated successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Category deleted successfully',
    success: true,
    data: result,
  });
});

export const CategoryController = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
