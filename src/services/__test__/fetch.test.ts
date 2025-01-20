import {fetchApi} from '../fetch';
import {FETCH_ERROR_MESSAGES} from 'src/constants';

global.fetch = jest.fn();

describe('fetchApi', () => {
  const mockFetch = global.fetch as jest.Mock;
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return data on a successful API call', async () => {
    const mockData = {success: true};
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await fetchApi<typeof mockData>(
      'https://api.example.com/test',
    );

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(mockData);
  });

  it('should throw CustomError when response is not ok', async () => {
    const status = 404;
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status,
    });

    try {
      await fetchApi('https://api.example.com/test');
    } catch (error) {
      expect((error as Error).message).toBe(FETCH_ERROR_MESSAGES[`${status}`]);
    }
  });
});
