import { faker } from '@faker-js/faker';
import { AuthenticationArgs } from '@/domain/usecases/authentication';

export const mockAuthentication = (): AuthenticationArgs => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
