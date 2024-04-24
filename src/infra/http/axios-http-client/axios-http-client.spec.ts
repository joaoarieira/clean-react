import { HttpPostArgs } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');

const makeSut = () => {
  return new AxiosHttpClient();
};

const makePostRequest = (): HttpPostArgs => ({
  url: faker.internet.url(),
  body: {},
});

describe('AxiosHttpClient', () => {
  test('should call axios with correct args', async () => {
    const sut = makeSut();
    const request = makePostRequest();
    await sut.post(request);
    expect(axios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
