import { useFormContext } from '@/presentation/contexts/form/use-form-context';
import Styles from './styles.module.scss';
import { useMemo } from 'react';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ name, ...props }: Props) {
  const { errors } = useFormContext();

  const isErroed = useMemo(
    () => name != null && errors[name] != null,
    [errors, name],
  );

  const errorMessage = isErroed ? errors[name!].message : '';

  const statusIndicator = '🔴';

  return (
    <div className={Styles['input-wrapper']}>
      <input {...props} />
      <span
        className={Styles.status}
        title={errorMessage}
        data-testid={`${name}-status`}
      >
        {statusIndicator}
      </span>
    </div>
  );
}
