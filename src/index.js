import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { secureHeaders } from "hono/secure-headers";
import { requestId } from "hono/request-id";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import contentRoutes from "./routes/contentRoutes";
import pujaRoutes from "./routes/pujaRoutes";


const app = new Hono();
app.use(logger());
app.use(requestId());
app.use(secureHeaders());
app.use('*', async (c, next) => {
	const allowedOrigins = [
		"http://localhost:5173",
		c.env.PRODUCTION_URL      
	];

	const corsMiddleware = cors({
		origin: (origin) => {
			
			if (!origin) return allowedOrigins[0];

			return allowedOrigins.includes(origin) ? origin : null;
		},
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});

	return corsMiddleware(c, next);
});

app.get("/", (c) => {
	return c.json({
		success: true,
		message: "Welcome to Golpahar Mohashoshan Kali Mandir Backend API",
		status: 200,
	});
});

app.get("/api/health", (c) => {
	return c.json({ success: true, message: "Golpahar Mandir Server Active" });
});

const api = new Hono().basePath("/api");

api.route("/auth", authRoutes);
api.route("/dashboard", dashboardRoutes);
api.route("/contents", contentRoutes);
api.route("/pujas", pujaRoutes)

app.route("/", api);


app.notFound((c) => {
	return c.json(
		{
			success: false,
			message: "API Endpoint Not Found",
		},
		404
	);
});

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return c.json(
			{
				error: { message: err.message, requestId: c.get("requestId") },
			},
			err.status
		);
	}

	console.error(err);
	return c.json(
		{
			error: { message: "Internal Server Error", requestId: c.get("requestId") },
		},
		500
	);
});

export default app;