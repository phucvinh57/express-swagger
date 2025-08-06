import { Type } from "@sinclair/typebox";
import express, { type Application } from "express";
import { logger } from "@/utils/logger";
import routes from "./routes";
import {
	createValidationMiddleware,
	setupSwagger,
} from "./utils/express-swagger";

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Health check endpoint
app.get(
	"/health",
	createValidationMiddleware({
		response: {
			200: Type.Object({ status: Type.String(), timestamp: Type.String() }),
		},
	}),
	(_req, res) => {
		res.json({ status: "OK", timestamp: new Date().toISOString() });
	},
);

setupSwagger(app);

app.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}`);
	logger.info(`API documentation available at http://localhost:${port}/docs`);
});

export default app;
