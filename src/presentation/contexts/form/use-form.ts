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
  setIsLoading: (isLoading: boolean) => void;
  getIsFieldErroed: (name: string) => boolean;
  getFieldErrorMessage: (name: string) => string | undefined;
  setFieldErrorMessage: (name: string, message: string | undefined) => void;
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

  const setFieldErrorMessage = useCallback(
    (name: string, message: string | undefined) => {
      setState((oldState) => {
        if (message === undefined) {
          if (oldState.errors) {
            delete oldState.errors[name];
          }
          return { ...oldState, errors: { ...oldState.errors } };
        }
        const newState = {
          ...oldState,
          errors: { ...oldState.errors, [name]: message },
        };
        return newState;
      });
    },
    [],
  );

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

  const setIsLoading = useCallback((isLoading: boolean) => {
    setState((oldState) => ({
      ...oldState,
      isLoading,
    }));
  }, []);

  return {
    isLoading: state.isLoading,
    values: state.values,
    errors: state.errors,
    setValue,
    setState,
    setIsLoading,
    setFieldErrorMessage,
    getIsFieldErroed,
    getFieldErrorMessage,
  };
}
