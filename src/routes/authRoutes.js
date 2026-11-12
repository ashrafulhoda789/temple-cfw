import { Hono } from "hono";
import { createAuth } from "../lib/auth";

const authRoutes = new Hono();

authRoutes.all("*", (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

export default authRoutes;