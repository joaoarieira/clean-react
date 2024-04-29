import { useCallback, useState } from 'react';

export type FormState = {
  isLoading: boolean;
  values: Record<string, unknown>;
  errors?: Record<string, string>;
};

export type UseFormReturn = {
  isLoading: boolean;
  values: Record<string, unknown>;
  errors: Record<string, string> | undefined;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  setValue: (name: string, value: unknown) => void;
  getIsFieldErroed: (name: string) => boolean;
  getFieldErrorMessage: (name: string) => string | undefined;
};

type UseFormProps = {
  defaultState: Partial<FormState>;
};

export function useForm(props?: UseFormProps): UseFormReturn {
  const [state, setState] = useState<FormState>({
    isLoading: false,
    values: {},
    errors: undefined,
    ...props?.defaultState,
  });

  const setValue = useCallback((name: string, value: unknown) => {
    setState((oldState) => {
      const newState = {
        ...oldState,
        values: { ...oldState.values, [name]: value },
      };
      return newState;
    });
  }, []);

  const getIsFieldErroed = useCallback(
    (name: string) =>
      name != null && state.errors != null && state.errors[name] != null,
    [state.errors],
  );

  const getFieldErrorMessage = useCallback(
    (name: string) => {
      const isErroed = getIsFieldErroed(name);
      return isErroed ? state.errors![name] : undefined;
    },
    [getIsFieldErroed, state.errors],
  );

  return {
    isLoading: state.isLoading,
    values: state.values,
    errors: state.errors,
    setValue,
    setState,
    getIsFieldErroed,
    getFieldErrorMessage,
  };
}
