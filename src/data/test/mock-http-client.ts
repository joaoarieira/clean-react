import {
  HttpPostClient,
  HttpPostClientArgs,
} from '@/data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;

  async post({ url, body }: HttpPostClientArgs): Promise<void> {
    this.url = url;
    this.body = body;
    return Promise.resolve();
  }
}
