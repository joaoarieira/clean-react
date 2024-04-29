import { useFormContext } from '@/presentation/contexts/form/use-form-context';
import Styles from './styles.module.scss';
import { useCallback } from 'react';

type Props = {
  name: string;
  label?: React.ReactNode;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Input({ name, id, label, ...props }: Props) {
  const { setValue, getFieldErrorMessage } = useFormContext();
  const inputId = id ?? `${name}-input`;
  const errorMessage = getFieldErrorMessage(name);
  const statusIndicator = '🔴';

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value);
    },
    [name, setValue],
  );

  return (
    <div className={Styles['input-wrapper']}>
      {label != null && <label htmlFor={inputId}>{label}</label>}

      <input id={inputId} name={name} onChange={handleChange} {...props} />

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
