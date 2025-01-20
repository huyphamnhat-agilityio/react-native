import {fireEvent, render, screen} from 'test-utils';
import ProductList, {ProductListProps} from '..';
import {MOCK_PRODUCT} from 'src/mocks';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('ProductList', () => {
  const mockNavigate = jest.fn();

  const mockUseNavigation = useNavigation as jest.Mock;

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

  it('test', () => {
    setup({
      products: [MOCK_PRODUCT],
    });
    const productName = screen.getByTestId('product-1');

    fireEvent.press(productName);

    expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {id: '1'});
  });
});
