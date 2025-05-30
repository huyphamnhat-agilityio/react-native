import {fetchApi} from '../fetch';

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
});
