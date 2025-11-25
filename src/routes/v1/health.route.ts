import express from 'express';
import prisma from '../../client';

const router = express.Router();

router.get('/', async (req, res) => {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };

  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      ...healthcheck,
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      ...healthcheck,
      status: 'error',
      database: 'disconnected'
    });
  }
});

export default router;
