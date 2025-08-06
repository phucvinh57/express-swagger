import type { Request, Response } from "express";

type HandlerError = {
	message: string;
	code?: string;
};
export type Handler<
	T extends {
		Query?: unknown;
		Params?: unknown;
		Body?: unknown;
		Resp?: unknown;
	} = object,
> = (
	req: Request<
		T["Params"] extends undefined ? unknown : T["Params"],
		T["Resp"] extends undefined ? unknown : T["Resp"],
		T["Body"] extends undefined ? unknown : T["Body"],
		T["Query"] extends undefined ? unknown : T["Query"]
	>,
	res: Response<
		T["Resp"] extends undefined ? unknown : T["Resp"] | HandlerError
	>,
) => void | Promise<void>;
