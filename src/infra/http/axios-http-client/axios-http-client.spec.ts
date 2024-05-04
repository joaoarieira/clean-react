import { makePostRequestArgs } from '@/data/test';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test/mock-axios';
import { AxiosError, AxiosResponse } from 'axios';

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
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.data);
  });

  test('should return the correct statusCode and body on success', () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = sut.post(makePostRequestArgs());
    const axiosResponse = mockedAxios.post.mock.results[0]
      .value as AxiosResponse<unknown>;

    expect(httpResponse).toEqual(axiosResponse);
  });

  test('should return the correct statusCode and body on error', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() });
    const httpResponse = sut.post(makePostRequestArgs());
    const axiosError = mockedAxios.post.mock.results[0].value as Promise<
      AxiosError<unknown>
    >;

    expect(httpResponse).toEqual(axiosError);
  });
});
