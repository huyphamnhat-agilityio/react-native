import bcrypt from 'bcryptjs';
import {getUser} from '../user';
import {useUserStore} from 'src/store';
import {ERROR_MESSAGE} from 'src/constants';
import {UserPayload} from 'src/interfaces';
import {login} from '../auth';

jest.mock('../user');
jest.mock('bcryptjs');
jest.mock('src/store', () => ({
  useUserStore: {
    getState: jest.fn(),
  },
}));

describe('login', () => {
  const mockGetUser = getUser as jest.Mock;
  const mockBcryptCompareSync = bcrypt.compareSync as jest.Mock;
  const mockSetUser = jest.fn();

  beforeEach(() => {
    (useUserStore.getState as jest.Mock).mockReturnValue({
      setUser: mockSetUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set user in store on successful login', async () => {
    const mockUser = {email: 'test@example.com', password: 'hashedPassword'};
    const payload: UserPayload = {
      email: 'test@example.com',
      password: 'plaintextPassword',
    };

    mockGetUser.mockResolvedValueOnce(mockUser);
    mockBcryptCompareSync.mockReturnValueOnce(true);

    const result = await login(payload);

    expect(mockGetUser).toHaveBeenCalledWith({email: payload.email});
    expect(mockBcryptCompareSync).toHaveBeenCalledWith(
      payload.password,
      mockUser.password,
    );
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);
    expect(result).toBeUndefined();
  });

  it('should return error message for invalid password', async () => {
    const mockUser = {email: 'test@example.com', password: 'hashedPassword'};
    const payload: UserPayload = {
      email: 'test@example.com',
      password: 'wrongPassword',
    };

    mockGetUser.mockResolvedValueOnce(mockUser);
    mockBcryptCompareSync.mockReturnValueOnce(false);

    const result = await login(payload);

    expect(mockGetUser).toHaveBeenCalledWith({email: payload.email});
    expect(mockBcryptCompareSync).toHaveBeenCalledWith(
      payload.password,
      mockUser.password,
    );
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(result).toBe(ERROR_MESSAGE.LOGIN[404]);
  });

  it('should return error message when user is not found', async () => {
    const payload: UserPayload = {
      email: 'nonexistent@example.com',
      password: 'password',
    };

    mockGetUser.mockRejectedValueOnce(new Error('User not found'));

    const result = await login(payload);

    expect(mockGetUser).toHaveBeenCalledWith({email: payload.email});
    expect(mockBcryptCompareSync).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(result).toBe('User not found');
  });

  it('should return fallback error message for unhandled errors', async () => {
    const payload: UserPayload = {
      email: 'test@example.com',
      password: 'password',
    };

    mockGetUser.mockRejectedValueOnce('Unexpected error');

    const result = await login(payload);

    expect(mockGetUser).toHaveBeenCalledWith({email: payload.email});
    expect(mockBcryptCompareSync).not.toHaveBeenCalled();
    expect(mockSetUser).not.toHaveBeenCalled();
    expect(result).toBe(ERROR_MESSAGE.LOGIN['500']);
  });
});
