import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AccountModel } from '@/domain/models';
import { AuthenticationArgs } from '@/domain/usecases';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { Login } from '@/presentation/pages';
import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

const url = 'http://localhost:5050/api/login';
const axiosHttpClient = new AxiosHttpClient<AuthenticationArgs, AccountModel>();
const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
const validationComposit = ValidationComposite.build([
  ...ValidationBuilder.field('email').required().email().build(),
  ...ValidationBuilder.field('password').required().minLength(5).build(),
]);

export const makeLogin = () => {
  return (
    <Login
      validation={validationComposit}
      authentication={remoteAuthentication}
    />
  );
};
