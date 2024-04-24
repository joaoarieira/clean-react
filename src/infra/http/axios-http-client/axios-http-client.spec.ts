import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL', async () => {
    const sut = new AxiosHttpClient();
    const url = faker.internet.url();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});