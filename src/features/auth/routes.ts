import { Hono } from 'hono';
import { validator } from '../../utils/validator';
import { login, register, verifyOTP } from './controller';
import { mailAuthSchema, otpAuthSchema } from './validators';

const authRoutes = new Hono();

authRoutes.post('/login', validator('json', mailAuthSchema), login);
authRoutes.post('/register', validator('json', mailAuthSchema), register);
authRoutes.post('/confirm', validator('json', otpAuthSchema), verifyOTP);

export default authRoutes;
