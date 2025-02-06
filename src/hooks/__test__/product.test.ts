import {MOCK_PRODUCT, MOCK_PRODUCTS} from 'src/mocks';
import {getProduct, getProducts} from 'src/services';
import {AllTheProviders, renderHook, waitFor} from 'test-utils';
import {
  useGetInfinitiveProducts,
  useGetProducts,
  useProductDetail,
} from '../product';

jest.mock('src/services', () => ({
  getProducts: jest.fn(),
  getProduct: jest.fn(),
}));
describe('useGetProducts', () => {
  const mockGetProducts = getProducts as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the list of products', async () => {
    mockGetProducts.mockResolvedValueOnce([MOCK_PRODUCT]);

    const {result} = renderHook(() => useGetProducts(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.data).toStrictEqual([MOCK_PRODUCT]);
    });
  });
});

describe('useProductDetail', () => {
  const mockGetProduct = getProduct as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the list of products', async () => {
    mockGetProduct.mockResolvedValueOnce(MOCK_PRODUCT);

    const {result} = renderHook(() => useProductDetail('1'), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.data).toBe(MOCK_PRODUCT);
    });
  });
});

describe('useGetInfinitiveProducts', () => {
  const mockGetProducts = getProducts as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockProducts = [
    {id: 1, name: 'Product 1', price: 100},
    {id: 2, name: 'Product 2', price: 200},
    {id: 3, name: 'Product 3', price: 300},
  ];
  it('should fetch initial products correctly', async () => {
    mockGetProducts.mockResolvedValueOnce(mockProducts);

    const {result} = renderHook(() => useGetInfinitiveProducts(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockProducts);

    expect(getProducts).toHaveBeenCalledWith({
      page: 1,
      limit: 6,
    });
  });

  it('should handle pagination correctly', async () => {
    const page1Products = MOCK_PRODUCTS.splice(6);
    const page2Products = MOCK_PRODUCTS.splice(-6);

    mockGetProducts
      .mockResolvedValueOnce(page1Products)
      .mockResolvedValueOnce(page2Products);

    const {result} = renderHook(() => useGetInfinitiveProducts(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    await result.current.fetchNextPage();

    await waitFor(() => {
      expect(result.current.data).toHaveLength(12);
    });

    expect(getProducts).toHaveBeenCalledTimes(2);
    expect(getProducts).toHaveBeenNthCalledWith(1, {
      page: 1,
      limit: 6,
    });
    expect(getProducts).toHaveBeenNthCalledWith(2, {
      page: 2,
      limit: 6,
    });
  });

  it('should handle query parameters correctly', async () => {
    mockGetProducts.mockResolvedValueOnce(mockProducts);

    const queryParams = {
      category: 'electronics',
      sortBy: 'price',
    };

    const {result} = renderHook(() => useGetInfinitiveProducts(queryParams), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getProducts).toHaveBeenCalledWith({
      category: 'electronics',
      sortBy: 'price',
      page: 1,
      limit: 6,
    });
  });
});
