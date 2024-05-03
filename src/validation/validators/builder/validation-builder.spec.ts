import {
  ValidationBuilder as sut,
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { faker } from '@faker-js/faker';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const fieldName = faker.lorem.word();

    const validations = sut.field(fieldName).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('should return EmailValidation', () => {
    const fieldName = faker.lorem.word();

    const validations = sut.field(fieldName).email().build();

    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('should return MinLengthValidation', () => {
    const fieldName = faker.lorem.word();
    const minLength = faker.number.int({ max: 4000 }); // max arbitrário

    const validations = sut.field(fieldName).minLength(minLength).build();

    expect(validations).toEqual([
      new MinLengthValidation(fieldName, minLength),
    ]);
  });

  test('should return a list of validations', () => {
    const fieldName = faker.lorem.word();
    const minLength = faker.number.int({ max: 4000 }); // max arbitrário

    const validations = sut
      .field(fieldName)
      .required()
      .email()
      .minLength(minLength)
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
    ]);
  });
});
