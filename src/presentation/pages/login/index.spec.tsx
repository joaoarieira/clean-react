import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages/login';
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test';
import { faker } from '@faker-js/faker';
import { Screen, fireEvent, render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

type MakeSutArgs = {
  /**
   * `string`: mensagem de erro manual.
   *
   * `undefined`: sem mensagem de erro.
   */
  validationError?: string;
};

type PopulateEmailFieldArgs = {
  sut: Screen;
  user: UserEvent;
  email?: string;
};

type PopulatePasswordFieldArgs = {
  sut: Screen;
  user: UserEvent;
  password?: string;
};

type SimulateValidSubmitArgs = PopulateEmailFieldArgs & {
  password?: string;
};

type AssertStatusForFieldArgs = {
  sut: Screen;
  fieldName: string;
  /**
   * `string`: mensagem de erro esperada.
   *
   * `undefined`: sem mensagem de erro.
   */
  errorMessage?: string;
};

const makeSut = (args?: MakeSutArgs) => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = args?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const user = userEvent.setup();
  const renderResult = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />,
  );

  return {
    sut: screen,
    user,
    renderResult,
    validationSpy,
    authenticationSpy,
  };
};

const populateEmailField = async ({
  sut,
  user,
  email = faker.internet.email(),
}: PopulateEmailFieldArgs) => {
  const emailInput = sut.getByRole<HTMLInputElement>('textbox', {
    name: 'E-mail',
  });
  await user.type(emailInput, email);
};

const populatePasswordField = async ({
  sut,
  user,
  password = faker.internet.password(),
}: PopulatePasswordFieldArgs) => {
  const passwordInput =
    sut.getByPlaceholderText<HTMLInputElement>('Digite sua senha');
  await user.type(passwordInput, password);
};

const expectStatusForField = ({
  sut,
  fieldName,
  errorMessage,
}: AssertStatusForFieldArgs) => {
  const fieldStatus = sut.getByTestId<HTMLSpanElement>(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(errorMessage ?? 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(errorMessage ? '🔴' : '🟢');
};

const simulateValidSubmit = async ({
  sut,
  user,
  email = faker.internet.email(),
  password = faker.internet.password(),
}: SimulateValidSubmitArgs) => {
  const submitButton = sut.getByRole<HTMLButtonElement>('button', {
    name: 'Entrar',
  });

  await populateEmailField({ sut, user, email });
  await populatePasswordField({ sut, user, password });
  await user.click(submitButton);

  return {
    submitButton,
  };
};

describe('Login', () => {
  test('should not show error message when mounting', () => {
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
    const { sut } = makeSut({ validationError: faker.lorem.sentence() });
    const submitButton = sut.getByRole<HTMLButtonElement>('button', {
      name: 'Entrar',
    });

    expect(submitButton.disabled).toBe(true);
  });

  test('should have its email field status indicator advising that it is required', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.lorem.sentence(),
    });

    expectStatusForField({
      sut,
      fieldName: 'email',
      errorMessage: validationSpy.errorMessage,
    });
  });

  test('should call Validation with correct email', async () => {
    const { sut, user, validationSpy } = makeSut();
    const email = faker.internet.email();

    await populateEmailField({ sut, user, email });

    expect(validationSpy.fieldValue).toEqual(email);
  });

  test('should call Validation with correct password', async () => {
    const { sut, user, validationSpy } = makeSut();
    const password = faker.internet.password();

    await populatePasswordField({ sut, user, password });

    expect(validationSpy.fieldValue).toEqual(password);
  });

  test('should show email error if Validation fails', async () => {
    const { sut, validationSpy, user } = makeSut({
      validationError: faker.lorem.sentence(),
    });

    await populateEmailField({ sut, user });

    expectStatusForField({
      sut,
      fieldName: 'email',
      errorMessage: validationSpy.errorMessage,
    });
  });

  test('should show password error if Validation fails', async () => {
    const { sut, validationSpy, user } = makeSut({
      validationError: faker.lorem.sentence(),
    });

    await populatePasswordField({ sut, user });

    expectStatusForField({
      sut,
      fieldName: 'password',
      errorMessage: validationSpy.errorMessage,
    });
  });

  test('should show email success if Validation succeeds', async () => {
    const { sut, user } = makeSut();

    await populateEmailField({ sut, user });

    expectStatusForField({ sut, fieldName: 'email' });
  });

  test('should show password success if Validation succeeds', async () => {
    const { sut, user } = makeSut();

    await populatePasswordField({ sut, user });

    expectStatusForField({ sut, fieldName: 'password' });
  });

  test('should enable the submit button if credentials are valid', async () => {
    const { sut, user } = makeSut();
    const submitButton = sut.getByRole<HTMLButtonElement>('button', {
      name: 'Entrar',
    });

    await populateEmailField({ sut, user });
    await populatePasswordField({ sut, user });

    expect(submitButton.disabled).toBe(false);
  });

  test('should show loading spinner on submit', async () => {
    const { sut, user } = makeSut();

    await simulateValidSubmit({ sut, user });

    const loadingSpinnerComponent = await sut.findByTestId(
      'form-status-loading',
    );

    expect(loadingSpinnerComponent).not.toBeNull();
  });

  test('should call Authentication with correct values', async () => {
    const { sut, user, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit({ sut, user, email, password });

    expect(authenticationSpy.args).toEqual({
      email,
      password,
    });
  });

  test('should call Authentication only once', async () => {
    const { sut, user, authenticationSpy } = makeSut();
    const { submitButton } = await simulateValidSubmit({ sut, user });

    await user.click(submitButton); // clica denovo

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('should not call Authentication if form is invalid', async () => {
    const { sut, user, authenticationSpy } = makeSut({
      validationError: faker.lorem.sentence(),
    });
    const form = await sut.findByRole<HTMLFormElement>('form');

    await populateEmailField({ sut, user });
    fireEvent.submit(form, { name: 'login' });

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should show error and hide spinner if Authentication fails', async () => {
    const { sut, user, authenticationSpy } = makeSut();
    const errorException = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(errorException);

    await simulateValidSubmit({ sut, user });

    const fieldName = 'erro';
    const errorMessageComponent = await sut.findByTestId<HTMLLIElement>(
      'form-status-error-' + fieldName,
    );
    const loadingSpinnerComponent = sut.queryByTestId('form-status-loading');

    expect(errorMessageComponent.textContent).toBe(
      `${fieldName}: ${errorException.message}`,
    );
    expect(loadingSpinnerComponent).toBeNull();
  });
});
