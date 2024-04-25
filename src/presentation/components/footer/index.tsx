import Styles from './styles.module.scss';
import { memo } from 'react';

function FooterComponent() {
  return <footer className={Styles.footer}>footer</footer>;
}

export const Footer = memo(FooterComponent);
