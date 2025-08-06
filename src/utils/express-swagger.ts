import type { TSchema } from "@sinclair/typebox";
import { AssertError, Value } from "@sinclair/typebox/value";
import type { Application, IRouter, Handler as Middleware } from "express";
import type { OpenAPIV3_1 } from "openapi-types";
import swaggerUi from "swagger-ui-express";

const openApiSpec: OpenAPIV3_1.Document = {
	openapi: "3.1.0",
	info: {
		title: "API Documentation",
		version: "1.0.0",
	},
	paths: {},
};

type ValidationOptions = {
	query?: TSchema;
	params?: TSchema;
	body?: TSchema;
	response?: Record<number, TSchema>;
};
export function createValidationMiddleware(
	options: ValidationOptions,
): Middleware {
	const __expressSwagger: Middleware = (req, res, next) => {
		try {
			if (options.query) req.query = Value.Parse(options.query, req.query);
			if (options.params) req.params = Value.Parse(options.params, req.params);
			if (options.body) req.body = Value.Parse(options.body, req.body);
			next();
		} catch (error) {
			if (error instanceof AssertError) {
				const validationErrors = error.Errors().First();
				res.status(400).json(validationErrors);
			} else {
				res.status(500).json({ message: "Internal server error" });
			}
		}
	};
	__expressSwagger.prototype = { openapi: options };
	return __expressSwagger;
}

type ILayer = IRouter["stack"][number];
function printRouteStack(stack: ILayer) {
	if (!stack.route) {
		if (stack.name === "router") {
			const router = stack.handle as IRouter;
			console.log("=== Router");
			console.log(stack);
			for (const subLayer of router.stack) {
				printRouteStack(subLayer);
			}
			console.log("=== End Router");
		} else {
			console.log(`Middleware: ${stack.name}`);
		}
	} else {
		// @ts-ignore
		console.log("Handler:", stack.route, stack.matchers[0].prototype);
	}
}

export function setupSwagger(app: Application) {
	const layers = app.router.stack;
	for (const layer of layers) {
		printRouteStack(layer);
	}

	app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
}
