import { HttpResponse } from '@/data/protocols/http';

export type HttpPostArgs<TData = unknown> = {
  url: string;
  data?: TData;
};

export interface HttpPostClient<
  TRequestData = unknown,
  TResponseData = unknown,
  TResponseErrorData = unknown,
> {
  post(
    args: HttpPostArgs<TRequestData | TResponseErrorData>,
  ): Promise<HttpResponse<TResponseData | TResponseErrorData>>;
}
