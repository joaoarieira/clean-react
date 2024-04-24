import { HttpPostArgs } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient<TRequestBody = unknown> {
  async post({ url, body }: HttpPostArgs<TRequestBody>) {
    return axios.post(url, body);
  }
}
