import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory';
import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(5).build(),
      ]),
    );
  });
});
