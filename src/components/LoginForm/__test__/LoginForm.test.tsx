import {fireEvent, render, screen, waitFor} from 'test-utils';
import LoginForm from '..';
import {act} from 'react';
import {login} from 'src/services';
import {Alert} from 'react-native';

jest.mock('src/services/auth.ts', () => ({
  login: jest.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = login as jest.Mock;

  const setup = () => render(<LoginForm />);

  beforeEach(() => jest.restoreAllMocks());

  it('should render correctly', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should show error alert when login fails', async () => {
    const errorMessage = 'Invalid credentials';
    mockLogin.mockResolvedValueOnce(errorMessage);
    setup();

    jest.spyOn(Alert, 'alert');

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'mock1234');
    });

    await act(async () => fireEvent.press(loginButton));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'mock1234',
      });
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        errorMessage,
        [{text: 'Ok'}],
        {cancelable: true},
      );
    });
  });
  it('should handle input changes', () => {
    mockLogin.mockResolvedValueOnce(undefined);

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
    mockLogin.mockResolvedValueOnce(undefined);

    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    const loginButton = screen.getByTestId('login');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'mock1234');
    });

    await act(async () => fireEvent.press(loginButton));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'mock1234',
      });
    });
  });
});
