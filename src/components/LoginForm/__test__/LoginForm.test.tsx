import {fireEvent, render, screen, waitFor} from 'test-utils';
import LoginForm from '..';
import {act} from 'react';
import {LoginFormData} from 'src/interfaces';

jest.mock('src/services/auth.ts', () => ({
  login: jest.fn(),
}));

describe('LoginForm', () => {
  // const mockLogin = login as jest.Mock;
  const mockSubmit = jest
    .fn()
    .mockImplementation((_: LoginFormData) => Promise<void>);

  const setup = () => render(<LoginForm onSubmit={mockSubmit} />);

  beforeEach(() => jest.restoreAllMocks());

  it('should render correctly', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should handle input changes', () => {
    mockSubmit.mockResolvedValueOnce(undefined);

    setup();

    const passwordInput = screen.getByTestId('password');

    const toggleButton = screen.getByTestId('toggle-password');

    act(() => {
      fireEvent.changeText(passwordInput, 'mock1234');

      fireEvent.press(toggleButton);
    });

    expect(passwordInput).toHaveDisplayValue('mock1234');
  });

  it('should able to submit when login form is filled properly', async () => {
    setup();
    mockSubmit.mockResolvedValueOnce(undefined);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'mock1234');
    });

    await act(async () => fireEvent.press(loginButton));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
