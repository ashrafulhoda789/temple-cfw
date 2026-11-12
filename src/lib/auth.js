
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "../db/schema";

export const createAuth = (env) => {
    const db = drizzle(env.DB, { schema });

    return betterAuth({
        database: drizzleAdapter(db, {
            provider: "sqlite",
            schema: {
                user: schema.user,
                session: schema.session,
                account: schema.account,
                verification: schema.verification,
            },
        }),

        secret: env.BETTER_AUTH_SECRET,
        baseURL: env.BETTER_AUTH_URL,

        trustedOrigins: [
            env.PRODUCTION_URL
        ],

        session: {
            expiresIn: 60 * 60 * 24 * 15,
            updateAge: 60 * 60 * 24,
        },

        emailAndPassword: {
            enabled: true,
            requireEmailVerification: false,
            async sendResetPassword({ user, url }) {
                console.log(`Password reset link for ${user.email}: ${url}`);
            },
        },

        user: {
            additionalFields: {
                role: {
                    type: "string",
                    defaultValue: "editor",
                    required: false,
                    input: false,
                },
            },
        },

        advanced: {
            useSecureCookies: true,
            crossSubDomainCookies: {
                enabled: false,
            },
        },
    });
};
