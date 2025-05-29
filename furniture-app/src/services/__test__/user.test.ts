import {toQueryString} from 'src/utils';
import {fetchApi} from '../fetch';
import {User} from 'src/interfaces';
import {MOCK_USER} from 'src/mocks';
import {getUser} from '../user';
import {RESOURCES} from 'src/constants';

jest.mock('../fetch');
jest.mock('src/utils');

describe('user service', () => {
  const mockFetchApi = fetchApi as jest.Mock;
  const mockToQueryString = toQueryString as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return user information', async () => {
    const mockResponse: User[] = [MOCK_USER];

    mockFetchApi.mockResolvedValueOnce(mockResponse);
    mockToQueryString.mockReturnValueOnce('');

    const result = await getUser();

    expect(mockToQueryString).toHaveBeenCalledWith(undefined);
    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.API_URL}/${RESOURCES.USER}`,
    );
    expect(result).toEqual(mockResponse[0]);
  });

  it('should fetch products with parameters', async () => {
    const params = {email: MOCK_USER.email};
    const mockResponse: User[] = [MOCK_USER];

    const queryString = `email=${params.email}`;

    mockFetchApi.mockResolvedValueOnce(mockResponse);
    mockToQueryString.mockReturnValueOnce(queryString);

    const result = await getUser(params);

    expect(mockToQueryString).toHaveBeenCalledWith(params);
    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.API_URL}/${RESOURCES.USER}${queryString}`,
    );
    expect(result).toEqual(mockResponse[0]);
  });

  it('should handle errors thrown by fetchApi', async () => {
    const errorMessage = 'Failed to fetch user';

    mockFetchApi.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getUser()).rejects.toThrow(errorMessage);
  });
});
