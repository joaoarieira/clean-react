import { Login } from '@/presentation/pages/login';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// const user = userEvent.setup();

describe('Login', () => {
  test('should not show error message when mounting', () => {
    render(<Login />);
    const errorMessageComponent = screen.queryByTestId('form-status-error');
    expect(errorMessageComponent).toBeNull();
  });

  test('should not show loading spinner when mounting', () => {
    render(<Login />);
    const loadingSpinnerComponent = screen.queryByTestId('form-status-loading');
    expect(loadingSpinnerComponent).toBeNull();
  });

  test('should have submit button disabled when mounting', () => {
    render(<Login />);
    const submitButton = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Entrar',
    });
    expect(submitButton.disabled).toBe(true);
  });

  test('should have its email field status indicator advising that it is required', () => {
    render(<Login />);
    const statusComponent = screen.getByTestId<HTMLSpanElement>('email-status');
    expect(statusComponent.textContent).toBe('🔴');
    expect(statusComponent.title).toBe('campo obrigatório');
  });
});
