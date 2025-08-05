import { Request, Response } from 'express';
type HandlerError = { 
  message: string;
  code?: string;
}
export type Handler<T extends {
  Query?: any;
  Params?: any;
  Body?: any;
  Resp?: any;
} = {}> = (
  req: Request<
    T['Params'] extends undefined ? any : T['Params'],
    T['Resp'] extends undefined ? any : T['Resp'],
    T['Body'] extends undefined ? any : T['Body'],
    T['Query'] extends undefined ? any : T['Query']
  >,
  res: Response<T['Resp'] extends undefined ? any : T['Resp'] | HandlerError>
) => void | Promise<void>;