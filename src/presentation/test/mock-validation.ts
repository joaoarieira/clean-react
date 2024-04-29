import { Validation } from '@/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage: string | undefined;
  fieldName: string | undefined;
  fieldValue: unknown;

  validate(fieldName: string, fieldValue: unknown): string | undefined {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}
