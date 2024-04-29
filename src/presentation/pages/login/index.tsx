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

type Props = {
  validation: Validation;
};

export function Login({ validation }: Props) {
  if (validation) {
    // TODO: REMOVER
    // existe só pra fazer o Typescript parar de reclamar
  }

  const loginForm = useForm({
    defaultState: {
      errors: { email: 'campo obrigatório', password: 'campo obrigatório' },
    },
  });

  useEffect(() => {
    validation?.validate('email', loginForm.values['email']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginForm.values['email']]);

  useEffect(() => {
    validation?.validate('password', loginForm.values['password']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginForm.values['password']]);

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContextProvider {...loginForm}>
        <form className={Styles.form}>
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
            label="a Senha dele"
            placeholder="Digite sua senha"
          />

          <button type="submit" disabled className={Styles.submit}>
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
