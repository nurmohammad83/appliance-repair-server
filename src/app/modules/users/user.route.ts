import express from 'express';
import { UserController } from './user.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-user', UserController.createUser);

router.get(
  '/',

  UserController.getAllFromDb
);

router.get(
  '/:id',

  UserController.getByIdFromDb
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.deleteByIdFromDb
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.USER),
  UserController.updateByIdFromDb
);

export const UserRoutes = router;
