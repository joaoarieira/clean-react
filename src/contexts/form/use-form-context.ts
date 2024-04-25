import { FormContext } from '@/contexts/form/form-context';
import { useContext } from 'react';

export function useFormContext() {
  return useContext(FormContext);
}
