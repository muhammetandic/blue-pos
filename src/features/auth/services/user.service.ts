import { db, schema } from '../../../db';
import tenantService from './tenant.service';

class UserService {
  public async getUserByMail(mail: string) {
    return await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.mail, mail),
    });
  }

  public async verifyPassword(incomingPassword: string, userPassword: string) {
    return await Bun.password.verify(
      incomingPassword,
      userPassword,
      'argon2id',
    );
  }

  public async createUser(mail: string, password: string) {
    const [result] = await db
      .insert(schema.users)
      .values({ mail, password: await Bun.password.hash(password, 'argon2id') })
      .returning({ insertedId: schema.users.id });
    return result.insertedId;
  }

  public async createTenantUser(tenantId: number, userId: number) {
    const result = await db
      .insert(schema.tenantsUsers)
      .values({ tenantId, userId, isAdmin: true, createdBy: userId });
    return result;
  }

  public async authenticateUser(mail: string, password: string) {
    const user = await this.getUserByMail(mail);

    if (!user) return { user: null, error: 'User not found' };

    const isValid = await this.verifyPassword(password, user.password);

    if (!isValid) return { user: null, error: 'Invalid password' };

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, error: null };
  }

  public async createNewTenant(mail: string, password: string) {
    const user = await this.getUserByMail(mail);
    if (user) return { userId: null, error: 'User already exists' };

    const userId = await this.createUser(mail, password);

    const tenantId = await tenantService.createTenant(mail, userId);
    await this.createTenantUser(tenantId, userId);

    return { userId, error: null };
  }
}

const userService = new UserService();
export default userService;
