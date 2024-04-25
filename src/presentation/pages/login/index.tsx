import { Spinner } from '@/presentation/components/spinner';
import Styles from './styles.module.scss';
import { LoginHeader } from '@/presentation/components/login-header';
import { Footer } from '@/presentation/components/footer';

export function Login() {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles['input-wrapper']}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={Styles.status}>🔴</span>
        </div>

        <div className={Styles['input-wrapper']}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={Styles.status}>🔴</span>
        </div>

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
