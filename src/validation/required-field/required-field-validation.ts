import { RequiredFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_value: string): Error {
    return new RequiredFieldError();
  }
}
