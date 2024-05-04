import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory';
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory';
import { Login } from '@/presentation/pages';

export const makeLogin = () => {
  return (
    <Login
      validation={makeLoginValidation()}
      authentication={makeRemoteAuthentication()}
    />
  );
};
