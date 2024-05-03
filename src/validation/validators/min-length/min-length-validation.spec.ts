import { InvalidFieldError } from '@/validation/errors';
import { faker } from '@faker-js/faker';
import { MinLengthValidation } from './min-length-validation';

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const minLength = faker.number.int();
    const wordLength = faker.number.int({ min: 0, max: minLength - 1 });
    const sut = new MinLengthValidation(faker.lorem.word(), minLength);

    const error = sut.validate(faker.lorem.word({ length: wordLength }));

    expect(error).toEqual(new InvalidFieldError());
  });
});
