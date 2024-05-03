import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from '@/validation/validators';
import { faker } from '@faker-js/faker';

const makeSut = () => {
  return new RequiredFieldValidation(faker.lorem.word());
};

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  test('should return falsy if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.lorem.word());
    expect(error).toBeFalsy();
  });
});
