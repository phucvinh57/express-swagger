import { TSchema } from '@sinclair/typebox';
import { AssertError, Value } from '@sinclair/typebox/value';
import { Router, RouterOptions, Request, Response, Handler as Middleware } from 'express';
import { OpenAPIV3_1 } from 'openapi-types';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
type EndpointDefinition = {
  path: string;
  method: HttpMethod;
  query?: TSchema;
  params?: TSchema;
  body?: TSchema;
  response?: Record<number, TSchema>;
  middlewares?: Middleware[];
  handler: (req: Request<any>, res: Response) => void | Promise<void>;
}

const openApiSpec: OpenAPIV3_1.Document = {
  openapi: '3.1.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  paths: {},
};

export function createRouter(endpoints: EndpointDefinition[], options?: RouterOptions & { middlewares?: Middleware[]}): Router {
  const { middlewares: rootMiddlewares, ...routerOptions } = options || {};
  const router = Router(routerOptions);
  if(rootMiddlewares) router.use(...rootMiddlewares);

  for (const { path, method, query, params, body, handler, response, middlewares = [] } of endpoints) {
    const wrapHandler = (req: Request, res: Response) => {
      try {
        if (query) req.query = Value.Parse(query, req.query);
        if (params) req.params = Value.Parse(params, req.params);
        if (body) req.body = Value.Parse(body, req.body);
      } catch (error) {
        if (error instanceof AssertError) {
          const validationErrors = error.Errors().First();
          return res.status(400).json(validationErrors);
        } else {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      return handler(req, res);
    };

    // Update OpenAPI spec
    if (!openApiSpec.paths?.[path]) {
      openApiSpec.paths![path] = {
        ['get']: {
          
          responses: {},
        },
      };
    }

    if (method === 'get') {
      router.get(path, ...middlewares, wrapHandler);
    } else if (method === 'post') {
      router.post(path, ...middlewares, wrapHandler);
    } else if (method === 'put') {
      router.put(path, ...middlewares, wrapHandler);
    } else if (method === 'delete') {
      router.delete(path, ...middlewares, wrapHandler);
    } else if (method === 'patch') {
      router.patch(path, ...middlewares, wrapHandler);
    } else if (method === 'options') {
      router.options(path, ...middlewares, wrapHandler);
    } else if (method === 'head') {
      router.head(path, ...middlewares, wrapHandler);
    } else throw new Error(`Unsupported HTTP method: ${method}`);
  }

  return router;
}