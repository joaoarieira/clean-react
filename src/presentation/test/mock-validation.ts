import { Validation } from '@/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage: string | undefined;
  fieldName: string | undefined;
  fieldValue: string | undefined;

  validate(fieldName: string, fieldValue: string): string | undefined {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}
