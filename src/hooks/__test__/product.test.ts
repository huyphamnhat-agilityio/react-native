import {MOCK_PRODUCT} from 'src/mocks';
import {getProduct, getProducts} from 'src/services';
import {AllTheProviders, renderHook, waitFor} from 'test-utils';
import {useGetProducts, useProductDetail} from '../product';

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
