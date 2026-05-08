import { Resend } from 'resend';
import { createWelcomeMail } from '../mails/welcome.mail';

const resend = new Resend(process.env.RESEND_API_KEY);
const from = process.env.MAIL_FROM || 'AntPOS <noreply@antpos.info>';

class MailService {
  public sendMail(to: string, subject: string, html: string) {
    resend.emails.send({ from, to, subject, html }).then(({ data, error }) => {
      if (error) {
        console.error('Error sending email:', error);
        return;
      }
      console.log('Successfully sent email!');
      console.log('email id:', data.id);
    }).catch(console.error);
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
