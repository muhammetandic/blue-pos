import type { Context } from 'hono';
import mailService from '../../services/mail.service';
import { ApiResult } from '../../types/result.type';
import tokenService from './services/token.service';
import userService from './services/user.service';
import type { MailAuthData, OTPAuthData } from './validators';

export async function login(c: Context) {
  const data: MailAuthData = await c.req.json();

  try {
    const result = await userService.authenticateUser(data.mail, data.password);
    if (!result.user) return c.json(ApiResult.error(result.error), 400);

    if (!result.user.isMailConfirmed)
      return c.json(ApiResult.error('user not verified'), 400);

    const tokens = await tokenService.generateTokens(result.user.id);
    return c.json(ApiResult.success(tokens), 200);
  } catch (error) {
    console.error(error);
  }
}

export async function register(c: Context) {
  const data: MailAuthData = await c.req.json();

  try {
    const user = await userService.getUserByMail(data.mail);
    if (user) return c.json(ApiResult.error('user already exists'), 400);

    const result = await userService.createNewTenant(data.mail, data.password);
    if (result.error) return c.json(ApiResult.error(result.error), 400);
    if (!result.userId) return c.json(ApiResult.error('user not created'), 400);

    const otp = await tokenService.generateOTPToken(result.userId);

    mailService.sendWelcomeMail(data.mail, data.mail);
    mailService.sendOtpMail(data.mail, otp);

    return c.json(
      ApiResult.success({ message: 'user created successfully' }),
      200,
    );
  } catch (error) {
    console.error(error);
  }
}

export async function verifyOTP(c: Context) {
  const data: OTPAuthData = await c.req.json();

  try {
    const user = await userService.getUserByMail(data.mail);
    if (!user) return c.json(ApiResult.error('user not found'), 400);

    const result = await tokenService.verifyOTPToken(user.id, data.otp);
    if (result.error) return c.json(ApiResult.error(result.error), 400);

    const tokens = await tokenService.generateTokens(user.id);
    return c.json(ApiResult.success(tokens), 200);
  } catch (error) {
    console.error(error);
  }
}
