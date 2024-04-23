import { HttpResponse } from '@/data/protocols/http/http-response';

export type HttpPostClientArgs<TBody = unknown> = {
  url: string;
  body?: TBody;
};

export interface HttpPostClient<
  TRequestBody = unknown,
  TResponseBody = unknown,
> {
  post(
    args: HttpPostClientArgs<TRequestBody>,
  ): Promise<HttpResponse<TResponseBody>>;
}
