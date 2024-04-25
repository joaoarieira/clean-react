import { Spinner } from '@/presentation/components/spinner';
import Styles from './styles.module.scss';

export function Login() {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <img src="/public/logo.svg" alt="Logo" />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>

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

      <footer className={Styles.footer}>footer</footer>
    </div>
  );
}
