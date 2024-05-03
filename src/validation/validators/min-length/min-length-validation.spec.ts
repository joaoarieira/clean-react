import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

function makeSut() {
  const minLength = faker.number.int({ max: 20 });
  const sut = new MinLengthValidation(faker.lorem.word(), minLength);
  return { sut, minLength };
}

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const { sut, minLength } = makeSut();
    const wordShorterThanMinLength = faker.string.alphanumeric({
      length: { min: 0, max: minLength - 1 },
    });

    const error = sut.validate(wordShorterThanMinLength);

    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if value is valid', () => {
    const { sut, minLength } = makeSut();
    const wordGreaterThanMinLength = faker.string.alphanumeric({
      length: { min: minLength, max: 50 },
    });

    const error = sut.validate(wordGreaterThanMinLength);

    expect(error).toBeFalsy();
  });
});
