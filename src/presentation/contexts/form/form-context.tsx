import { createContext, useMemo, useState } from 'react';

type FormContextProviderProps = {
  children: React.ReactNode;
};

type IFormContextState = {
  isLoading: boolean;
  errorMessage: string;
};

const defaultValues: IFormContextState = { isLoading: false, errorMessage: '' };

export const FormContext = createContext<IFormContextState>(defaultValues);

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [state] = useState(defaultValues);

  const memoizedContextValue: IFormContextState = useMemo(
    () => ({
      errorMessage: state.errorMessage,
      isLoading: state.isLoading,
    }),
    [state.errorMessage, state.isLoading],
  );

  return (
    <FormContext.Provider value={memoizedContextValue}>
      {children}
    </FormContext.Provider>
  );
};
