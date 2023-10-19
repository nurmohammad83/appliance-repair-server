import { Request, Response } from 'express';

import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServicesService } from './services.service';
import pick from '../../../shared/pick';
import { servicesFilterableFields } from './services.constants';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ServicesService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Services created successfully',
    success: true,
    data: result,
  });
});
const getAllFromDb = tryAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, servicesFilterableFields);
  const options = pick(req.query, [
    'page',
    'size',
    'sortBy',
    'sortOrder',
    'minPrice',
    'maxPrice',
  ]);
  const result = await ServicesService.getAllFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Services fetched successfully',
    success: true,
    data: result,
  });
});
const getByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ServicesService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service fetched successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await ServicesService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service updated successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await ServicesService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Service is deleted successfully',
    success: true,
    data: result,
  });
});
export const ServicesController = {
  insertIntoDb,
  getAllFromDb,
  deleteByIdFromDb,
  updateByIdFromDb,
  getByIdFromDb,
};
