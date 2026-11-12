import { Hono } from "hono";
import { protectedRoute, requireSuperAdmin, requireEditorOrAdmin } from "../middlewares/authMiddleware";

const dashboardRoutes = new Hono();

dashboardRoutes.get("/admin", protectedRoute, requireSuperAdmin, (c) => {
    const user = c.get("user");
    return c.json({
        success: true,
        message: "Welcome to Super Admin Control Panel",
        user,
    });
});

// Editor Dashboard
dashboardRoutes.get("/editor", protectedRoute, requireEditorOrAdmin, (c) => {
    const user = c.get("user");
    return c.json({
        success: true,
        message: "Welcome to Content Editor Dashboard",
        user,
    });
});

export default dashboardRoutes;