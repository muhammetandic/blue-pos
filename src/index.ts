import { type Context, Hono, type Next } from 'hono';
import { jwt } from 'hono/jwt';
import authRoutes from './features/auth/routes';
import denemeRoutes from './features/test/routes';
import { ApiResult } from './types/result.type';

const app = new Hono();

app.use('/api/*', (c: Context, next: Next) => {
  const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET ?? 'deneme' });
  return jwtMiddleware(c, next);
});

app.route('/auth', authRoutes);
app.route('/api', denemeRoutes);

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
