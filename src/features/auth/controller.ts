import type { Context } from 'hono';
import { db, schema } from '../../db';
import { sendEmail } from '../../services/mail.service';
import { ApiResult } from '../../types/result.type';
import { createWelcomeMail } from './mails/welcome.mail';
import type { MailAuthData } from './validators';

export async function login(c: Context) {
  const data: MailAuthData = await c.req.json();

  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.mail, data.mail),
    });
    console.log(user);
    if (!user) return c.json(ApiResult.error('user not found'), 404);

    const isValidPassword = await Bun.password.verify(
      data.password,
      user.password,
      'argon2id',
    );
    if (!isValidPassword)
      return c.json(ApiResult.error('password is invalid'), 404);
  } catch (error) {
    console.error(error);
  }
  return c.json(ApiResult.error('something went wrong'), 500);
}

export async function register(c: Context) {
  const data: MailAuthData = await c.req.json();

  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.mail, data.mail),
    });
    if (user) return c.json(ApiResult.error('user already exists'), 400);

    const result = await db
      .insert(schema.users)
      .values({
        mail: data.mail,
        password: await Bun.password.hash(data.password, 'argon2id'),
      })
      .returning({ insertedId: schema.users.id });

    const { to, subject, html } = createWelcomeMail(data.mail, data.mail);
    sendEmail(to, subject, html);

    return c.json(ApiResult.success({ message: 'user created successfully' }));
  } catch (error) {
    console.error(error);
  }
  return c.json(ApiResult.error('something went wrong'), 500);
}
