import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.insertIntoDb
);

router.get('/', CategoryController.getAllFromDb);
router.get('/:id', CategoryController.getByIdFromDb);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.deleteByIdFromDb
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  CategoryController.updateByIdFromDb
);

export const CategoryRoutes = router;
