import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validationRequest';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.create),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.insertIntoDb
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getAllFromDb
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getByIdFromDb
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  BookingController.deleteByIdFromDb
);

router.patch(
  '/:id',
  validateRequest(BookingValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  BookingController.updateByIdFromDb
);

export const BookingRoutes = router;
