import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';

export const makeAxiosHttpClient = <
  TRequestData = unknown,
  TResponseData = unknown,
  TResponseErrorData = unknown,
>() => {
  return new AxiosHttpClient<TRequestData, TResponseData, TResponseErrorData>();
};
