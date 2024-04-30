/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormContextProvider } from '@/presentation/contexts/form/form-context';
import Styles from './styles.module.scss';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { useForm } from '@/presentation/contexts/form/use-form';
import { Validation } from '@/presentation/protocols/validation';
import { useEffect } from 'react';
import { Authentication } from '@/domain/usecases';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export function Login({ validation, authentication }: Props) {
  if (validation || authentication) {
    // TODO: REMOVER
    // existe só pra fazer o Typescript parar de reclamar
  }

  const loginForm = useForm();

  const isEmailErroed = loginForm.getIsFieldErroed('email');
  const isPasswordErroed = loginForm.getIsFieldErroed('password');
  const isSubmitDisabled = isEmailErroed || isPasswordErroed;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailErroed = loginForm.getIsFieldErroed('email');
    const isPasswordErroed = loginForm.getIsFieldErroed('password');

    if (loginForm.isLoading || isEmailErroed || isPasswordErroed) {
      return;
    }
    loginForm.setIsLoading(true);
    await authentication.auth({
      email: loginForm.values.email as string,
      password: loginForm.values.password as string,
    });
  };

  useEffect(() => {
    const emailErrorOrUndefined = validation.validate(
      'email',
      loginForm.values['email'],
    );
    loginForm.setFieldErrorMessage('email', emailErrorOrUndefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginForm.values['email']]);

  useEffect(() => {
    const passwordErrorOrUndefined = validation?.validate(
      'password',
      loginForm.values['password'],
    );
    loginForm.setFieldErrorMessage('password', passwordErrorOrUndefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginForm.values['password']]);

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContextProvider {...loginForm}>
        <form className={Styles.form} name="login" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input
            type="email"
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />

          <Input
            type="password"
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
          />

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={Styles.submit}
          >
            Entrar
          </button>

          <span className={Styles['new-account']}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContextProvider>

      <Footer />
    </div>
  );
}
