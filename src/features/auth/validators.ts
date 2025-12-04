import { z } from 'zod';

export const mailAuthSchema = z.object({
  mail: z.email('email should be valid'),
  password: z.string().min(6).max(16),
});

export type MailAuthData = z.infer<typeof mailAuthSchema>;

export const otpAuthSchema = z.object({
  mail: z.email('email should be valid'),
  otp: z.string().min(6).max(6),
});

export type OTPAuthData = z.infer<typeof otpAuthSchema>;
