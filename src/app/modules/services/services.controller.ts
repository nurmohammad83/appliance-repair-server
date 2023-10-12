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
    'limit',
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
export const ServicesController = {
  insertIntoDb,
  getAllFromDb,
};
