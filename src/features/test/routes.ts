import { type Context, Hono } from 'hono';

const denemeRoutes = new Hono();

denemeRoutes.get('/deneme', (ctx: Context) => {
  const payload = ctx.get('jwtPayload');
  return ctx.json(payload);
});

denemeRoutes.get('/test', (ctx: Context) => {
  const deneme = {
    result: 'successfull',
  };
  return ctx.json(deneme);
});

export default denemeRoutes;
