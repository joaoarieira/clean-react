import { Validation } from '@/presentation/protocols/validation';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]) {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, fieldValue: string): string | undefined {
    const validators = this.validators.filter((v) => v.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(fieldValue);
      if (error) {
        return error.message;
      }
    }
    return undefined;
  }
}
