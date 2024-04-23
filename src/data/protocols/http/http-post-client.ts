import { HttpResponse } from '@/data/protocols/http/http-response';

export type HttpPostClientArgs = {
  url: string;
  body?: object;
};

export interface HttpPostClient {
  post(args: HttpPostClientArgs): Promise<HttpResponse>;
}
