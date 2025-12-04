import { sign } from 'hono/jwt';

class JWTService {
  public async signJWT(user: string, expireInMinutes: number) {
    const payload = {
      sub: user,
      exp: Math.floor(Date.now() / 1000) + 60 * expireInMinutes,
    };

    const secret = process.env.JWT_SECRET ?? 'deneme';
    return await sign(payload, secret);
  }
}

const jwtService = new JWTService();
export default jwtService;
