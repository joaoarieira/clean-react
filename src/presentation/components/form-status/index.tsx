import { useFormContext } from '@/contexts/form/use-form-context';
import Styles from './styles.module.scss';
import { Spinner } from '@/presentation/components';

export function FormStatus() {
  const { isLoading, errorMessage } = useFormContext();
  return (
    <div className={Styles['error-wrap']}>
      {isLoading && (
        <Spinner className={Styles.spinner} data-testid="form-status-loading" />
      )}

      {errorMessage && (
        <span className={Styles.error} data-testid="form-status-error">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
