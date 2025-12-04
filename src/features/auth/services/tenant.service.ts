import { db, schema } from '../../../db';

class TenantService {
  public async createTenant(name: string, userId: number) {
    const [result] = await db
      .insert(schema.tenants)
      .values({ name, createdBy: userId })
      .returning({ insertedId: schema.tenants.id });

    return result.insertedId;
  }
}

const tenantService = new TenantService();
export default tenantService;
