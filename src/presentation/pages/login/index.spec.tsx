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
});
