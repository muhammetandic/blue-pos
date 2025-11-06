import { Hono } from 'hono';
import authRoutes from './features/auth/routes';
import { ApiResult } from './types/result.type';

const app = new Hono();

app.route('/auth', authRoutes);

app.get('/health', (c) =>
  c.json(
    ApiResult.success({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }),
  ),
);

app.notFound((c) => c.json(ApiResult.error('route not found'), 404));

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
