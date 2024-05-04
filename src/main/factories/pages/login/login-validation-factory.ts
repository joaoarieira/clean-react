import {
  ValidationComposite,
  ValidationBuilder,
} from '@/validation/validators';

export const makeLoginValidation = () => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(5).build(),
  ]);
};
