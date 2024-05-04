import {
  HttpPostArgs,
  HttpPostClient,
  HttpResponse,
} from '@/data/protocols/http';
import axios from 'axios';

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
    const axiosResponse = await axios.post<TResponseData | TResponseErrorData>(
      url,
      data,
    );

    return {
      status: axiosResponse.status,
      data: axiosResponse.data,
    };
  }
}
