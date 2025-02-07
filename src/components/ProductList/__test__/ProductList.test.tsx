import {act, fireEvent, render, screen} from 'test-utils';
import ProductList, {ProductListProps} from '..';
import {MOCK_PRODUCT, MOCK_PRODUCTS} from 'src/mocks';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('ProductList', () => {
  const mockNavigate = jest.fn();

  const mockUseNavigation = useNavigation as jest.Mock;
  const mockFetchNextPage = jest.fn();
  const mockReset = jest.fn();

  const setup = (props: ProductListProps) => render(<ProductList {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigation.mockReturnValue({navigate: mockNavigate});
  });

  it('should render correctly', () => {
    const {toJSON} = setup({
      products: [MOCK_PRODUCT],
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should navigate to ProductDetail screen when clicking on product card', () => {
    setup({
      products: [MOCK_PRODUCT],
      handlePress: mockNavigate,
    });
    const productName = screen.getByTestId('product-1');

    fireEvent.press(productName);

    expect(mockNavigate).toHaveBeenCalledWith('1');
  });

  it('should invoke the load more function when reaching the end of the product list', async () => {
    setup({
      products: MOCK_PRODUCTS,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
    });

    const flatList = screen.getByTestId('product-list');

    act(() => {
      fireEvent(flatList, 'onEndReached');
    });

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it('should be able to refresh the list', async () => {
    setup({
      products: MOCK_PRODUCTS,
      resetData: mockReset,
    });

    const flatList = screen.getByTestId('product-list');

    const {refreshControl} = flatList.props;

    expect(refreshControl).toBeDefined();

    const {onRefresh} = refreshControl.props;

    act(() => {
      onRefresh();
    });

    expect(mockReset).toHaveBeenCalled();
  });
});
