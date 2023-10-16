import express from 'express';
import { TimeSlotsController } from './slots.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-slot',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TimeSlotsController.createTimeSlot
);
router.get('/', TimeSlotsController.getAllTimeSlots);
router.get('/:id', TimeSlotsController.getSingleTimeSlot);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TimeSlotsController.updateTimeSlot
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  TimeSlotsController.deleteTimeSlot
);

export const TimeSlotsRoutes = router;
