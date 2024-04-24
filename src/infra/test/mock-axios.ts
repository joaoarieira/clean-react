import { faker } from '@faker-js/faker';
import axios from 'axios';

export const mockAxios = () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxiosResponse = { data: {}, status: faker.number.int() };
  mockedAxios.post.mockClear().mockResolvedValue(mockedAxiosResponse);
  return mockedAxios;
};
