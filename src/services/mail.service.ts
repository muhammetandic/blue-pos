import { Resend } from "resend";

const emailWorker = new Worker(
  new URL("../workers/mail.ts", import.meta.url).href,
);

export function sendEmail(to: string, subject: string, html: string) {
  emailWorker.postMessage({ to, subject, html });
}
