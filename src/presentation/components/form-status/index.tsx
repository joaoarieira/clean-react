import { useFormContext } from '@/presentation/contexts/form/use-form-context';
import Styles from './styles.module.scss';
import { Spinner } from '@/presentation/components';
import { useMemo } from 'react';

export function FormStatus() {
  const { isLoading, errors } = useFormContext();

  const errorEntries = useMemo(() => Object.entries(errors ?? {}), [errors]);

  return (
    <div className={Styles['error-wrap']}>
      {isLoading && (
        <Spinner className={Styles.spinner} data-testid="form-status-loading" />
      )}

      {!!errorEntries.length && (
        <ul className={Styles.error} data-testid="form-status-error">
          {errorEntries.map(([fieldName, fieldError]) => (
            <li key={fieldName} data-testid={`form-status-error-${fieldName}`}>
              {fieldName}: {fieldError}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
