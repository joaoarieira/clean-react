import { faker } from '@faker-js/faker';
import axios from 'axios';

export const mockHttpResponse = () => ({
  data: {},
  status: faker.number.int({ max: 599 }),
});

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxiosResponse = mockHttpResponse();
  mockedAxios.post.mockClear().mockResolvedValue(mockedAxiosResponse);
  return mockedAxios;
};
