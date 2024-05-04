import {
  HttpPostArgs,
  HttpPostClient,
  HttpResponse,
} from '@/data/protocols/http';
import axios, { AxiosError } from 'axios';

export class AxiosHttpClient<
  TRequestData = unknown,
  TResponseData = unknown,
  TResponseErrorData = unknown,
> implements HttpPostClient<TRequestData, TResponseData, TResponseErrorData>
{
  async post({
    url,
    data,
  }: HttpPostArgs<TRequestData>): Promise<
    HttpResponse<TResponseData | TResponseErrorData>
  > {
    return axios
      .post<TResponseData>(url, data)
      .then(
        (response): HttpResponse<TResponseData> => ({
          status: response.status,
          data: response.data,
        }),
      )
      .catch(
        (
          error: AxiosError<TResponseErrorData>,
        ): HttpResponse<TResponseErrorData> => ({
          status: error.response?.status ?? 500,
          data: error.response?.data,
        }),
      );
  }
}
