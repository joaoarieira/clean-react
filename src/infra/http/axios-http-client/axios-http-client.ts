import { HttpPostArgs } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient<TRequestBody = unknown> {
  async post({ url }: HttpPostArgs<TRequestBody>) {
    return axios(url);
  }
}
