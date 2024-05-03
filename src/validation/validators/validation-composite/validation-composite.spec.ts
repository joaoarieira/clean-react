import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation';
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite';
import { faker } from '@faker-js/faker';

const makeSut = (fieldName: string) => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
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
    const fieldName = faker.lorem.word();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const errorMessages = populateErrorMessages(fieldValidationsSpy);
    const firstErrorMessage = errorMessages[0].message;

    const validationErrorMessage = sut.validate(fieldName, faker.lorem.word());

    expect(validationErrorMessage).toBe(firstErrorMessage);
  });

  test('should return falsy if all validations succeeds', () => {
    const fieldName = faker.lorem.word();
    const { sut } = makeSut(fieldName);

    const validationErrorMessage = sut.validate(fieldName, faker.lorem.word());

    expect(validationErrorMessage).toBeFalsy();
  });
});
