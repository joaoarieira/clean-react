import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite';
import { faker } from '@faker-js/faker';

const makeSut = () => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];
  const sut = new ValidationComposite(fieldValidationsSpy);
  return { sut, fieldValidationsSpy };
};

const populateErrorMessages = (fieldValidationsSpy: FieldValidationSpy[]) => {
  const errorMessages = fieldValidationsSpy.map(
    () => new Error(faker.lorem.sentence()),
  );
  fieldValidationsSpy.forEach((fieldValidationSpy, index) => {
    fieldValidationSpy.error = errorMessages[index];
  });
  return errorMessages;
};

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut();
    const errorMessages = populateErrorMessages(fieldValidationsSpy);
    const firstErrorMessage = errorMessages[0].message;

    const validationErrorMessage = sut.validate('any_field', 'any_value');

    expect(validationErrorMessage).toBe(firstErrorMessage);
  });
});
