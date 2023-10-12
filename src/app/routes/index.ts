import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AdminRoutes } from '../modules/Admins/admins.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/category.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
