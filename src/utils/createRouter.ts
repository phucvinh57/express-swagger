import { Handler } from '@/interfaces/handler';
import { TSchema } from '@sinclair/typebox';
import { AssertError, Value } from '@sinclair/typebox/value';
import { Router, RouterOptions, Request, Response } from 'express';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
type EndpointDefinition = {
  path: string;
  method: HttpMethod;
  query?: TSchema;
  params?: TSchema;
  body?: TSchema;
  response?: Record<number, TSchema>;
  handler: Handler;
}

export function createRouter(endpoints: EndpointDefinition[], options?: RouterOptions): Router {
  const router = Router(options);

  for (const { path, method, query, params, body, response, handler } of endpoints) {
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

    if (method === 'get') {
      router.get(path, wrapHandler);
    } else if (method === 'post') {
      router.post(path, wrapHandler);
    } else if (method === 'put') {
      router.put(path, wrapHandler);
    } else if (method === 'delete') {
      router.delete(path, wrapHandler);
    } else if (method === 'patch') {
      router.patch(path, wrapHandler);
    } else if (method === 'options') {
      router.options(path, wrapHandler);
    } else if (method === 'head') {
      router.head(path, wrapHandler);
    }
  }

  return router;
}