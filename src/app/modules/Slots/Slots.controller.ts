import { Request, Response } from 'express';
import tryAsync from '../../../shared/tryAsync';
import { TimeSlotsServices } from './Slots.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createTimeSlot = tryAsync(async (req: Request, res: Response) => {
  const result = await TimeSlotsServices.createTimeSlot(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Time slot created successfully',
    success: true,
    data: result,
  });
});

const getAllTimeSlots = tryAsync(async (req: Request, res: Response) => {
  const result = await TimeSlotsServices.getAllTimeSlots();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Time slots created successfully',
    success: true,
    data: result,
  });
});

const getSingleTimeSlot = tryAsync(async (req: Request, res: Response) => {
  const result = await TimeSlotsServices.getSingleTimeSlot(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: ' time slot single successfully',
    success: true,
    data: result,
  });
});

const updateTimeSlot = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await TimeSlotsServices.updateTimeSlot(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Time slot Update successfully',
    success: true,
    data: result,
  });
});

const deleteTimeSlot = tryAsync(async (req: Request, res: Response) => {
  const result = await TimeSlotsServices.deleteTimeSlot(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: ' time slot delete successfully',
    success: true,
    data: result,
  });
});

export const TimeSlotsController = {
  createTimeSlot,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
