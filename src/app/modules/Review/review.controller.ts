import { Request, Response } from 'express';

import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review & Rating created successfully',
    success: true,
    data: result,
  });
});

const getAllFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Reviews fetched successfully',
    success: true,
    data: result,
  });
});

const getByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review & Rating fetched successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {...data} = req.body;
  const result = await ReviewService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review & Rating updated successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Review & Rating deleted successfully',
    success: true,
    data: result,
  });
});

export const ReviewController = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
