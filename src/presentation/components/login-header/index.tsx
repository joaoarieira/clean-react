import { Logo } from '@/presentation/components/logo';
import Styles from './styles.module.scss';
import { memo } from 'react';

function LoginHeaderComponent() {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
}

export const LoginHeader = memo(LoginHeaderComponent);
