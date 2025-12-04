import { type Context, Hono } from "hono";

const denemeRoutes = new Hono();

denemeRoutes.get("/deneme", (ctx: Context) => {
  const payload = ctx.get("jwtPayload");
  return ctx.json(payload);
});

export default denemeRoutes;
