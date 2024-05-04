import {
  HttpResponse,
  HttpStatusCode,
  HttpPostClient,
  HttpPostArgs,
} from '@/data/protocols/http';

export class HttpPostClientSpy<
  TRequestData = unknown,
  TResponseData = unknown,
  TResponseErrorData = unknown,
> implements HttpPostClient<TRequestData, TResponseData, TResponseErrorData>
{
  url?: string;
  body?: TRequestData;
  response: HttpResponse<TResponseData | TResponseErrorData> = {
    status: HttpStatusCode.ok,
  };

  async post({
    url,
    data: body,
  }: HttpPostArgs<TRequestData>): Promise<
    HttpResponse<TResponseData | TResponseErrorData>
  > {
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
