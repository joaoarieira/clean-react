import { FormContextProvider } from '@/presentation/contexts/form/form-context';
import Styles from './styles.module.scss';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';

export function Login() {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContextProvider>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
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
