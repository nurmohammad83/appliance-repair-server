import express from 'express';
import { adminController } from './admins.controller';
import validateRequest from '../../middlewares/validationRequest';
import { AdminValidation } from './admins.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.create),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.createAdmin
);
router.get('/', auth(ENUM_USER_ROLE.SUPER_ADMIN), adminController.getAllAdmins);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.getSingleAdmin
);
router.patch(
  '/:id',
  validateRequest(AdminValidation.update),
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.updateAdmin
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  adminController.deleteAdmin
);

export const AdminRoutes = router;
