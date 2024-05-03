import { FieldValidation } from '@/validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  error: Error | undefined = undefined;

  constructor(readonly field: string) {}

  validate(value: string): Error | undefined {
    console.log(value);
    return this.error;
  }
}
