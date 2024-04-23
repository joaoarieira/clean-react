import {
  HttpPostClient,
  HttpPostClientArgs,
} from '@/data/protocols/http/http-post-client';
import {
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http/http-response';

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
