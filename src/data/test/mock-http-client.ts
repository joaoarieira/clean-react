import {
  HttpResponse,
  HttpStatusCode,
  HttpPostClient,
  HttpPostClientArgs,
} from '@/data/protocols/http';

export class HttpPostClientSpy<TRequestBody = unknown, TResponseBody = unknown>
  implements HttpPostClient<TRequestBody, TResponseBody>
{
  url?: string;
  body?: TRequestBody;
  response: HttpResponse<TResponseBody> = {
    statusCode: HttpStatusCode.ok,
  };

  async post({
    url,
    body,
  }: HttpPostClientArgs<TRequestBody>): Promise<HttpResponse<TResponseBody>> {
    this.url = url;
    this.body = body;
    return Promise.resolve(this.response);
  }
}
