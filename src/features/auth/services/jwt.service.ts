import { sign, verify } from 'hono/jwt';

class JWTService {
  public async signJWT(user: string, expireInMinutes: number) {
    const payload = {
      sub: user,
      exp: Math.floor(Date.now() / 1000) + 60 * expireInMinutes,
    };

    const secret = process.env.JWT_SECRET ?? 'deneme';
    return await sign(payload, secret);
  }

  public async verifyJWT(token: string) {
    const secret = process.env.JWT_SECRET ?? 'deneme';
    try {
      return await verify(token, secret);
    } catch {
      return false;
    }
  }
}

const jwtService = new JWTService();
export default jwtService;
