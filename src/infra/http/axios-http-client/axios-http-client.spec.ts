import { makePostRequestArgs } from '@/data/test';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { mockAxios } from '@/infra/test/mock-axios';
import { AxiosResponse } from 'axios';

jest.mock('axios');

const makeSut = () => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct args', async () => {
    const { sut, mockedAxios } = makeSut();
    const request = makePostRequestArgs();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = await sut.post(makePostRequestArgs());
    const axiosResponse = (await mockedAxios.post.mock.results[0]
      .value) as AxiosResponse<unknown>;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });
});
