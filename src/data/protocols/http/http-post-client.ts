import { HttpResponse } from '@/data/protocols/http';

export type HttpPostArgs<TBody = unknown> = {
  url: string;
  body?: TBody;
};

export interface HttpPostClient<
  TRequestBody = unknown,
  TResponseBody = unknown,
> {
  post(args: HttpPostArgs<TRequestBody>): Promise<HttpResponse<TResponseBody>>;
}
