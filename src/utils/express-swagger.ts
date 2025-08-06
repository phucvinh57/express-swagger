import type { TSchema } from "@sinclair/typebox";
import { AssertError, Value } from "@sinclair/typebox/value";
import type { RequestHandler } from "express";

// import type { OpenAPIV3_1 } from "openapi-types";

// const openApiSpec: OpenAPIV3_1.Document = {
// 	openapi: "3.1.0",
// 	info: {
// 		title: "API Documentation",
// 		version: "1.0.0",
// 	},
// 	paths: {},
// };

type ValidationOptions = {
	query?: TSchema;
	params?: TSchema;
	body?: TSchema;
	response?: Record<number, TSchema>;
};
export function createValidationMiddleware(
	options: ValidationOptions,
): RequestHandler<unknown> {
	const middleware: RequestHandler<unknown> = (req, res, next) => {
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
	middleware.prototype = { openapi: options };
	return middleware;
}
