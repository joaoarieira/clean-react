import { Login } from '@/presentation/pages/login';
import { Validation } from '@/presentation/protocols/validation';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

class ValidationSpy implements Validation {
  errorMessage: string | undefined;
  fieldName: string | undefined;
  fieldValue: unknown;

  validate(fieldName: string, fieldValue: unknown): string | undefined {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

const makeSut = () => {
  const validationSpy = new ValidationSpy();
  const user = userEvent.setup();
  const renderResult = render(<Login validation={validationSpy} />);

  return {
    sut: screen,
    user,
    renderResult,
    validationSpy,
  };
};

describe('Login', () => {
  test.skip('should not show error message when mounting', () => {
    const { sut } = makeSut();
    const errorMessageComponent = sut.queryByTestId('form-status-error');

    expect(errorMessageComponent).toBeNull();
  });

  test('should not show loading spinner when mounting', () => {
    const { sut } = makeSut();
    const loadingSpinnerComponent = sut.queryByTestId('form-status-loading');

    expect(loadingSpinnerComponent).toBeNull();
  });

  test('should have submit button disabled when mounting', () => {
    const { sut } = makeSut();
    const submitButton = sut.getByRole<HTMLButtonElement>('button', {
      name: 'Entrar',
    });

    expect(submitButton.disabled).toBe(true);
  });

  test('should have its email field status indicator advising that it is required', () => {
    const { sut } = makeSut();
    const statusComponent = sut.getByTestId<HTMLSpanElement>('email-status');

    expect(statusComponent.textContent).toBe('🔴');
    expect(statusComponent.title).toMatch(/campo obrigatório/i);
  });

  test('should call Validation with correct email', async () => {
    const { sut, user, validationSpy } = makeSut();
    const emailInput = sut.getByRole<HTMLInputElement>('textbox', {
      name: 'E-mail',
    });
    const emailValue = faker.internet.email();

    await user.type(emailInput, emailValue);

    expect(validationSpy.fieldValue).toEqual(emailValue);
  });

  test('should call Validation with correct password', async () => {
    const { sut, user, validationSpy } = makeSut();
    const passwordInput =
      sut.getByPlaceholderText<HTMLInputElement>('Digite sua senha');
    const passwordValue = faker.internet.password();

    await user.type(passwordInput, passwordValue);

    expect(validationSpy.fieldValue).toEqual(passwordValue);
  });
});
