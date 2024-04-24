import { HttpPostArgs } from '@/data/protocols/http';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResponse = { data: {}, status: faker.number.int() };
mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

const makeSut = () => {
  return new AxiosHttpClient();
};

const makePostRequestArgs = (): HttpPostArgs => ({
  url: faker.internet.url(),
  body: {},
});

describe('AxiosHttpClient', () => {
  test('should call axios with correct args', async () => {
    const sut = makeSut();
    const request = makePostRequestArgs();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const response = await sut.post(makePostRequestArgs());
    expect(response).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data,
    });
  });
});
