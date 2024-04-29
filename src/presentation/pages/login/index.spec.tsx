import { Login } from '@/presentation/pages/login';
import { ValidationSpy } from '@/presentation/test/mock-validation';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type MakeSutArgs = {
  /**
   * `string`: mensagem de erro manual.
   *
   * `undefined`: gera mensagem de erro automaticamente.
   *
   * `null`: sem mensagem de erro.
   */
  errorMessage?: string | null;
};

const makeSut = (args?: MakeSutArgs) => {
  const validationSpy = new ValidationSpy();
  const errorMessage =
    args?.errorMessage !== null
      ? faker.lorem.sentence({ min: 1, max: 10 })
      : undefined;
  validationSpy.errorMessage = errorMessage;
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
  test('should not show error message when mounting', () => {
    const { sut } = makeSut({
      errorMessage: null,
    });
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
    const { sut, validationSpy } = makeSut();
    const statusComponent = sut.getByTestId<HTMLSpanElement>('email-status');

    expect(statusComponent.textContent).toBe('🔴');
    expect(statusComponent.title).toBe(validationSpy.errorMessage);
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

  test('should show email error if Validation fails', async () => {
    const { sut, validationSpy, user } = makeSut();
    const emailInput = sut.getByRole<HTMLInputElement>('textbox', {
      name: 'E-mail',
    });

    await user.type(emailInput, faker.internet.email());
    const emailStatus = await sut.findByTestId<HTMLSpanElement>('email-status');

    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('should show password error if Validation fails', async () => {
    const { sut, validationSpy, user } = makeSut();
    const passwordInput =
      sut.getByPlaceholderText<HTMLInputElement>('Digite sua senha');

    await user.type(passwordInput, faker.internet.password());
    const passwordStatus =
      await sut.findByTestId<HTMLSpanElement>('password-status');

    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
