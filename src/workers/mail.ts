import { Resend } from "resend";

declare var self: Worker;
const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.EMAIL_FROM || "AntPOS <noreply@antpos.com.tr>";

self.onmessage = async (event: MessageEvent) => {
  const { to, subject, html } = event.data;
  await resend.emails.send({ from, to, subject, html });
};
