import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validationRequest';
import { ReviewValidation } from './review.validaton';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.create),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.insertIntoDb
);

router.get('/', ReviewController.getAllFromDb);
router.get('/:id', ReviewController.getByIdFromDb);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.deleteByIdFromDb
);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.update),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.updateByIdFromDb
);

export const ReviewRoutes = router;
