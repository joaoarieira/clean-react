import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

export const makeAxiosHttpClient = <
  TRequestBody = unknown,
  TResponseBody = unknown,
>() => {
  return new AxiosHttpClient<TRequestBody, TResponseBody>();
};
