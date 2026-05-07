import { Resend } from 'resend';

declare var self: Worker;
const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.MAIL_FROM || 'AntPOS <noreply@antpos.info>';

self.onmessage = async (event: MessageEvent) => {
  const { to, subject, html } = event.data;
  try {
    await resend.emails.send({ from, to, subject, html });
  } catch (error) {
    console.error(error);
  }
};
