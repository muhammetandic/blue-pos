export function createWelcomeMail(name: string, mail: string) {
  const subject = `Welcome to Our Platform, ${name}!`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #4f46e5; padding: 20px; color: white; text-align: center;">
        <h1 style="margin: 0; font-size: 22px;">Welcome, ${name}!</h1>
      </div>
      <div style="padding: 20px;">
        <p>Hi ${name},</p>
        <p>We’re excited to have you on board! You’ve successfully signed up with the email <strong>${mail}</strong>.</p>
        <p>Here’s what you can do next:</p>
        <ul>
          <li>Explore your dashboard</li>
          <li>Update your profile</li>
          <li>Start using our features</li>
        </ul>
        <p>If you have any questions, just reply to this email — we’re happy to help!</p>
        <p>Cheers,<br>The Support Team</p>
      </div>
      <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
        © ${new Date().getFullYear()} Our Platform — All rights reserved.
      </div>
    </div>
  `;

  return { to: mail, subject, html };
}
