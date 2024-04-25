import { Spinner } from '@/presentation/components/spinner';
import Styles from './styles.module.scss';
import { LoginHeader } from '@/presentation/components/login-header';
import { Footer } from '@/presentation/components/footer';
import { Input } from '@/presentation/components/input';

export function Login() {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />

        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button type="submit" className={Styles.submit}>
          Entrar
        </button>

        <span className={Styles.link}>Criar conta</span>

        <div className={Styles['error-wrap']}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>

      <Footer />
    </div>
  );
}
