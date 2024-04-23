import { faker } from '@faker-js/faker';
import { AccountModel } from '@/domain/models';
import { AuthenticationArgs } from '@/domain/usecases';

export const mockAuthentication = (): AuthenticationArgs => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid(),
});
