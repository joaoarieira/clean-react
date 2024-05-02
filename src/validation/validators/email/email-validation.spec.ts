import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from '@/validation/validators/email/email-validation';
import { faker } from '@faker-js/faker';

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.lorem.word());
    const error = sut.validate(faker.lorem.word());
    expect(error).toEqual(new InvalidFieldError());
  });
});
