import { Hono } from "hono";
import { login, register } from "./controller";
import { validator } from "../../utils/validator";
import { mailAuthSchema } from "./validators";

const authRoutes = new Hono();

authRoutes.post("/login", validator("json", mailAuthSchema), login);
authRoutes.post("/register", validator("json", mailAuthSchema), register);

export default authRoutes;
