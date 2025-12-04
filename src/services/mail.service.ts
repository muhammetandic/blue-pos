import { createWelcomeMail } from '../mails/welcome.mail';

const mailWorker = new Worker(
  new URL('../workers/mail.ts', import.meta.url).href,
);

class MailService {
  public sendMail(to: string, subject: string, html: string) {
    mailWorker.postMessage({ to, subject, html });
  }

  public sendWelcomeMail(to: string, name: string) {
    const subject = `Welcome to Our Platform, ${name}!`;
    const html = createWelcomeMail(to, name);
    this.sendMail(to, subject, html);
  }

  public sendOtpMail(to: string, otp: string) {
    const subject = 'Your One-Time Password (OTP)';
    const html = `<p>Hi, your One-Time Password (OTP) is: ${otp}</p>`;
    this.sendMail(to, subject, html);
  }
}

const mailService = new MailService();
export default mailService;
