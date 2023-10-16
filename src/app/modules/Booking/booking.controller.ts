import { Request, Response } from 'express';
import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const { userId, serviceId, date, slotId } = req.body;
  const result = await BookingService.insertIntoDb(
    userId,
    serviceId,
    date,
    slotId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    success: true,
    data: result,
  });
});

const getAllFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Bookings fetched successfully',
    success: true,
    data: result,
  });
});

const getByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking fetched successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await BookingService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const result = await BookingService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
    success: true,
    data: result,
  });
});

export const BookingController = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
