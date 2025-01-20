import {render} from 'test-utils';
import CartList, {CartListProps} from '..';
import {MOCK_CART_ITEM} from 'src/mocks';

describe('ShippingAddressCard', () => {
  const setup = (props: CartListProps) => render(<CartList {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup({
      data: [MOCK_CART_ITEM],
      renderItem: jest.fn(),
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
