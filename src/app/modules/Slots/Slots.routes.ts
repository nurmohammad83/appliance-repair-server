import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { TimeSlotsController } from './slots.controller';
import validateRequest from '../../middlewares/validationRequest';
import { SlotsValidation } from './slots.validationt';

const router = express.Router();

router.post(
  '/create-slot',
  validateRequest(SlotsValidation.create),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TimeSlotsController.createTimeSlot
);
router.get('/', TimeSlotsController.getAllTimeSlots);
router.get('/:id', TimeSlotsController.getSingleTimeSlot);
router.patch(
  '/:id',
  validateRequest(SlotsValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TimeSlotsController.updateTimeSlot
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TimeSlotsController.deleteTimeSlot
);

export const TimeSlotsRoutes = router;
