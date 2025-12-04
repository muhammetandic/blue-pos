export function sendOtpMail(name: string, otp: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">OTP Verification</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hi ${name},</p>
        <p>You requested a one-time password (OTP) for verification. Please use the code below to complete your authentication:</p>
        <div style="background-color: #f8fafc; border: 2px solid #e5e7eb; border-radius: 6px; padding: 20px; margin: 20px 0; text-align: center;">
          <h2 style="margin: 0; font-size: 32px; font-weight: bold; color: #4f46e5; letter-spacing: 4px; font-family: monospace;">${otp}</h2>
        </div>
        <p><strong>Important:</strong></p>
        <ul>
          <li>This code is valid for 30 minutes only</li>
          <li>Do not share this code with anyone</li>
          <li>If you didn't request this code, please ignore this email</li>
        </ul>
        <p>If you're having trouble with verification, just reply to this email — we're happy to help!</p>
        <p>Best regards,<br>The Support Team</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
        © ${new Date().getFullYear()} Our Platform — All rights reserved.
      </div>
    </div>
  `;

  return html;
}
