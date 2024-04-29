import { FormContextProvider } from '@/presentation/contexts/form/form-context';
import Styles from './styles.module.scss';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { useForm } from '@/presentation/contexts/form/use-form';

export function Login() {
  const loginForm = useForm({
    defaultState: {
      errors: { email: 'campo obrigatório', password: 'campo obrigatório' },
    },
  });

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
