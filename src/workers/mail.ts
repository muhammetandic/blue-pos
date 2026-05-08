import { Resend } from 'resend';

declare var self: Worker;
const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.MAIL_FROM || 'AntPOS <noreply@antpos.info>';

self.onmessage = async (event: MessageEvent) => {
  const { to, subject, html } = event.data;
  const html1 = `<p>Hi, your One-Time Password (OTP) is: </p>`;
  const { data, error } = await resend.emails.send({ from, to, subject, html: html1 });

  if (error) {
    console.error('Error sending email:', error);
    process.exit(1);
  }

  console.log('Successfully sent email!');
  console.log('email id:', data.id);
};
