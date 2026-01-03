import { Hono } from 'hono';
import { validator } from '../../utils/validator';
import {
  confirmUser,
  login,
  register,
  resetPassword,
  sendOTP,
  verifyOTP,
} from './controller';
import {
  mailAuthSchema,
  otpSendSchema,
  otpVerifySchema,
  resetPasswordSchema,
} from './validators';

const authRoutes = new Hono();

authRoutes.post('/login', validator('json', mailAuthSchema), login);
authRoutes.post('/register', validator('json', mailAuthSchema), register);
authRoutes.post('/confirm', validator('json', otpVerifySchema), confirmUser);
authRoutes.post('/forgot-password', validator('json', otpSendSchema), sendOTP);
authRoutes.post('/verify-otp', validator('json', otpVerifySchema), verifyOTP);
authRoutes.post('/resend-otp', validator('json', otpSendSchema), sendOTP);
authRoutes.post(
  '/reset-password',
  validator('json', resetPasswordSchema),
  resetPassword,
);

export default authRoutes;
