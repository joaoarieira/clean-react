/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from '@/presentation/contexts/form/use-form';
import { createContext } from 'react';

type FormContextProviderProps = {
  children: React.ReactNode;
} & UseFormReturn;

type FormContextValue = UseFormReturn;

export const FormContext = createContext<FormContextValue>(null!);

export const FormContextProvider = (props: FormContextProviderProps) => {
  const { children, ...formReturn } = props;

  return (
    <FormContext.Provider value={formReturn}>{children}</FormContext.Provider>
  );
};
