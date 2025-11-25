import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import healthRoute from './health.route';
import config from '../../config/config';

const router = express.Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/users', route: userRoute },
  { path: '/health', route: healthRoute }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  import('./docs.route').then((docsRoute) => {
    router.use('/docs', docsRoute.default);
  });
}

export default router;
