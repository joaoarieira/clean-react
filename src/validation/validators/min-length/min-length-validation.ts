import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number,
  ) {}

  validate(value: string): Error | undefined {
    return value.length >= this.minLength ? undefined : new InvalidFieldError();
  }
}
