import { sign } from 'hono/jwt';
import { db, schema } from '../../../db';
import { thirtyMinutes, tokenTypes, twentyDayInMinutes } from '../constants';
import { calculateFutureDate } from '../utils';

class TokenService {
  public async generateAccessToken(userId: number) {
    const payload = {
      sub: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * thirtyMinutes,
    };

    const secret = process.env.JWT_SECRET ?? 'deneme';
    const token = await sign(payload, secret);
    return token;
  }

  public async generateRefreshToken(userId: number) {
    const bytes = new Uint8Array(48);
    crypto.getRandomValues(bytes);
    const token = Buffer.from(bytes).toString('base64url');

    const expiresAt = calculateFutureDate(twentyDayInMinutes);
    await db
      .insert(schema.userTokens)
      .values({ userId, kind: tokenTypes.REFRESH, token, expiresAt });
    return token;
  }

  public async generateOTPToken(userId: number) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    const token = (array[0] % 1000000).toString().padStart(6, '0');

    const expiresAt = calculateFutureDate(thirtyMinutes);
    await db
      .insert(schema.userTokens)
      .values({ userId, kind: tokenTypes.OTP, token, expiresAt });
    return token;
  }

  public async verifyOTPToken(userId: number, token: string) {
    const result = await db.query.userTokens.findFirst({
      where: (userToken, { eq, and }) =>
        and(eq(userToken.userId, userId), eq(userToken.token, token)),
    });
    if (!result) return { error: 'token is invalid' };
    if (result.expiresAt < new Date()) return { error: 'token expired' };
    return { error: null };
  }

  public async generateTokens(userId: number) {
    const accessToken = await this.generateAccessToken(userId);
    const refreshToken = await this.generateRefreshToken(userId);
    return { accessToken, refreshToken };
  }
}

const tokenService = new TokenService();
export default tokenService;
