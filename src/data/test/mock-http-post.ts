import { HttpPostArgs } from '@/data/protocols/http';
import { faker } from '@faker-js/faker';

export const makePostRequestArgs = (): HttpPostArgs => ({
  url: faker.internet.url(),
  data: {},
});
