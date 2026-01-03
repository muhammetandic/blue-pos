import type { Context } from 'hono';
import mailService from '../../services/mail.service';
import { ApiResult } from '../../types/result.type';
import jwtService from './services/jwt.service';
import tokenService from './services/token.service';
import userService from './services/user.service';
import type {
  MailAuthData,
  OTPSendData,
  OTPVerifyData,
  ResetPasswordData,
} from './validators';

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
    return c.json(ApiResult.error('something went wrong'), 500);
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
    return c.json(ApiResult.error('something went wrong'), 500);
  }
}

export async function confirmUser(c: Context) {
  const data: OTPVerifyData = await c.req.json();

  try {
    const user = await userService.getUserByMail(data.mail);
    if (!user) return c.json(ApiResult.error('user not found'), 400);

    const result = await tokenService.verifyOTPToken(user.id, data.otp);
    if (result.error) return c.json(ApiResult.error(result.error), 400);

    await userService.confirmUser(user.id);
    return c.json(ApiResult.success({ message: 'user confirmed' }), 200);
  } catch (error) {
    console.error(error);
    return c.json(ApiResult.error('something went wrong'), 500);
  }
}

export async function verifyOTP(c: Context) {
  const data: OTPVerifyData = await c.req.json();

  try {
    const user = await userService.getUserByMail(data.mail);
    if (!user) return c.json(ApiResult.error('user not found'), 400);

    const result = await tokenService.verifyOTPToken(user.id, data.otp);
    if (result.error) return c.json(ApiResult.error(result.error), 400);

    const token = await tokenService.generateAccessToken(user.id);
    return c.json(ApiResult.success(token), 200);
  } catch (error) {
    console.error(error);
    return c.json(ApiResult.error('something went wrong'), 500);
  }
}

export async function sendOTP(c: Context) {
  const data: OTPSendData = await c.req.json();

  try {
    const user = await userService.getUserByMail(data.mail);
    if (!user)
      return c.json(
        ApiResult.success('otp sent to your mail if it exists'),
        200,
      );

    const otp = await tokenService.generateOTPToken(user.id);

    mailService.sendOtpMail(data.mail, otp);
    return c.json(
      ApiResult.success({ message: 'otp sent to your mail if it exists' }),
      200,
    );
  } catch (error) {
    console.error(error);
    return c.json(ApiResult.error('something went wrong'), 500);
  }
}

export async function resetPassword(c: Context) {
  const data: ResetPasswordData = await c.req.json();

  try {
    const jwtResult = await jwtService.verifyJWT(data.token);
    if (!jwtResult) return c.json(ApiResult.error('token not valid'), 400);

    const user = await userService.getUserById(jwtResult.sub as number);
    if (!user) return c.json(ApiResult.error('user not found'), 400);

    await userService.changePassword(user.id, data.password);
    return c.json(ApiResult.success({ message: 'password changed' }), 200);
  } catch (error) {
    console.error(error);
    return c.json(ApiResult.error('something went wrong'), 500);
  }
}
