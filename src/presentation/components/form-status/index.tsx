import Styles from './styles.module.scss';
import { Spinner } from '@/presentation/components/spinner';

export function FormStatus() {
  return (
    <div className={Styles['error-wrap']}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Erro</span>
    </div>
  );
}
