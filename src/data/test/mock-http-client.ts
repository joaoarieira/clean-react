import {
  HttpPostClient,
  HttpPostClientArgs,
} from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post({ url }: HttpPostClientArgs): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}
