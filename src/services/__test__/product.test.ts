import {fetchApi} from '../fetch';
import {CATEGORIES, RESOURCES} from 'src/constants';
import {toQueryString} from 'src/utils';
import {Product} from 'src/interfaces';
import {getProduct, getProducts} from '../products';
import {MOCK_PRODUCT} from 'src/mocks';

jest.mock('../fetch');
jest.mock('src/utils');

describe('getProducts', () => {
  const mockFetchApi = fetchApi as jest.Mock;
  const mockToQueryString = toQueryString as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products with no parameters', async () => {
    const mockResponse: Product[] = [MOCK_PRODUCT];

    mockFetchApi.mockResolvedValueOnce(mockResponse);
    mockToQueryString.mockReturnValueOnce('');

    const result = await getProducts();

    expect(mockToQueryString).toHaveBeenCalledWith(undefined);
    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.API_URL}/${RESOURCES.PRODUCTS}`,
    );
    expect(result).toEqual(mockResponse);
  });

  it('should fetch products with parameters', async () => {
    const params = {category: 'Electronics', name: 'Laptop'};
    const mockResponse: Product[] = [MOCK_PRODUCT];
    const queryString = '?category=Electronics&name=Laptop';

    mockFetchApi.mockResolvedValueOnce(mockResponse);
    mockToQueryString.mockReturnValueOnce(queryString);

    const result = await getProducts(params);

    expect(mockToQueryString).toHaveBeenCalledWith(params);
    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.API_URL}/${RESOURCES.PRODUCTS}${queryString}`,
    );
    expect(result).toEqual(mockResponse);
  });

  it('should clear category if it matches the first category title', async () => {
    const params = {category: CATEGORIES[0].title, name: 'Laptop'};
    const mockResponse: Product[] = [MOCK_PRODUCT];
    const queryString = '?category=&name=Laptop';

    mockFetchApi.mockResolvedValueOnce(mockResponse);
    mockToQueryString.mockReturnValueOnce(queryString);

    const result = await getProducts(params);

    expect(mockToQueryString).toHaveBeenCalledWith({
      category: '',
      name: 'Laptop',
    });
    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.API_URL}/${RESOURCES.PRODUCTS}${queryString}`,
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors thrown by fetchApi', async () => {
    const params = {category: 'Electronics'};
    const errorMessage = 'Failed to fetch products';

    mockFetchApi.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getProducts(params)).rejects.toThrow(errorMessage);
  });
});

describe('getProduct', () => {
  const mockFetchApi = fetchApi as jest.Mock;
  it('should return the product detail', async () => {
    const id = '1';
    const mockResponse: Product = MOCK_PRODUCT;

    mockFetchApi.mockResolvedValueOnce(mockResponse);

    const result = await getProduct(id);

    expect(mockFetchApi).toHaveBeenCalledWith(
      `${process.env.API_URL}/${RESOURCES.PRODUCTS}/${id}`,
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors thrown by fetchApi', async () => {
    const errorMessage = 'Failed to fetch products';

    mockFetchApi.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getProduct('1')).rejects.toThrow(errorMessage);
  });
});
