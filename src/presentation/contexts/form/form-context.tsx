import { createContext, useMemo, useState } from 'react';

type FormContextProviderProps = {
  children: React.ReactNode;
};

type IErrorState = {
  message: string;
  label?: string;
};

type IFormContextState = {
  isLoading: boolean;
  isValid: boolean;
  errors: Record<string, IErrorState>;
};

const defaultValues: IFormContextState = {
  isLoading: false,
  isValid: true,
  errors: {
    email: { label: 'E-mail', message: 'campo obrigatório' },
    password: { label: 'Senha', message: 'campo obrigatório' },
  },
};

export const FormContext = createContext<IFormContextState>(defaultValues);

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [state] = useState(defaultValues);

  const memoizedContextValue: IFormContextState = useMemo(
    () => ({
      isLoading: state.isLoading,
      isValid: true,
      errors: state.errors,
    }),
    [state.isLoading, state.errors],
  );

  return (
    <FormContext.Provider value={memoizedContextValue}>
      {children}
    </FormContext.Provider>
  );
};
