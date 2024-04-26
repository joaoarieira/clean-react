import { Login } from '@/presentation/pages/login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const makeSut = () => {
  const renderResult = render(<Login />);
  const user = userEvent.setup();

  return {
    sut: screen,
    user,
    renderResult,
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
    expect(statusComponent.title).toBe('campo obrigatório');
  });
});
