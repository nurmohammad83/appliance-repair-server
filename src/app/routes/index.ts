import express from 'express';
import { UserRoutes } from '../modules/users/user.route';
import { AdminRoutes } from '../modules/Admins/admins.routes';
import { AuthRoutes } from '../modules/auth/auth.route';

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
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
