import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');

const makeSut = () => {
  return new AxiosHttpClient();
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL and verb', async () => {
    const sut = makeSut();
    const url = faker.internet.url();
    await sut.post({ url });
    expect(axios.post).toHaveBeenCalledWith(url);
  });
});
