import { useFormContext } from '@/presentation/contexts/form/use-form-context';
import Styles from './styles.module.scss';
import { useMemo } from 'react';

type Props = {
  name: string;
  label?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ name, id, label, ...props }: Props) {
  const { errors } = useFormContext();
  const inputId = id ?? `${name}-input`;

  const isErroed = useMemo(
    () => name != null && errors[name] != null,
    [errors, name],
  );

  const errorMessage = isErroed ? errors[name].message : '';

  const statusIndicator = '🔴';

  return (
    <div className={Styles['input-wrapper']}>
      {label != null && <label htmlFor={inputId}>{label}</label>}

      <input id={inputId} name={name} {...props} />

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
