import { z } from 'zod';

export const mailAuthSchema = z.object({
  mail: z.email('email should be valid'),
  password: z.string().min(6).max(16),
});

export type MailAuthData = z.infer<typeof mailAuthSchema>;

export const otpVerifySchema = z.object({
  mail: z.email('email should be valid'),
  otp: z.string().min(6).max(6),
});

export type OTPVerifyData = z.infer<typeof otpVerifySchema>;

export const otpSendSchema = z.object({
  mail: z.email('email should be valid'),
});

export type OTPSendData = z.infer<typeof otpSendSchema>;

export const resetPasswordSchema = z.object({
  token: z.jwt(),
  password: z.string().min(6).max(16),
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
