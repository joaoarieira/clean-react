import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from '@/validation/validators/email/email-validation';
import { faker } from '@faker-js/faker';

const makeSut = () => {
  return new EmailValidation(faker.lorem.word());
};

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.lorem.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
