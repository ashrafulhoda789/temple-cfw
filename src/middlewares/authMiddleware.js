import { createAuth } from "../lib/auth";

export const protectedRoute = async (c, next) => {
    const auth = createAuth(c.env);
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        return c.json({ success: false, message: "Unauthorized! Please log in." }, 401);
    }

    c.set("user", session.user);
    c.set("session", session.session);
    await next();
};

export const requireSuperAdmin = async (c, next) => {
    const user = c.get("user");

    if (!user || user.role !== "super_admin") {
        return c.json({ success: false, message: "Forbidden! Requires Super Admin access." }, 403);
    }

    await next();
};

export const requireEditorOrAdmin = async (c, next) => {
    const user = c.get("user");

    if (!user || (user.role !== "editor" && user.role !== "super_admin")) {
        return c.json({ success: false, message: "Forbidden! Requires Content Editor or Super Admin access." }, 403);
    }

    await next();
};