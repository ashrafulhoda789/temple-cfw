import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export const createSuperAdmin = async (env, userId) => {
    const db = drizzle(env.DB, { schema });

    const result = await db
        .update(schema.user)
        .set({
            role: "super_admin",
            updatedAt: new Date(),
        })
        .where(eq(schema.user.id, userId));

    return {
        success: true,
        message: "Super Admin role assigned successfully",
    };
};