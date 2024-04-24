import {
  HttpPostArgs,
  HttpPostClient,
  HttpResponse,
} from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient<TRequestBody = unknown, TResponseBody = unknown>
  implements HttpPostClient<TRequestBody, TResponseBody>
{
  async post({
    url,
    body,
  }: HttpPostArgs<TRequestBody>): Promise<HttpResponse<TResponseBody>> {
    const axiosResponse = await axios.post<TResponseBody>(url, body);

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
