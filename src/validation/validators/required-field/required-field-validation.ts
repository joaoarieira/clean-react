import { RequiredFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | undefined {
    return value ? undefined : new RequiredFieldError();
  }
}
