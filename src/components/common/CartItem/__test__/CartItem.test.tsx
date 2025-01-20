import {render} from 'test-utils';
import CartItem, {CartItemProps} from '..';
import {MOCK_PRODUCT} from 'src/mocks';

describe('CartItem', () => {
  const mockProps: CartItemProps = {
    data: {
      id: MOCK_PRODUCT.id,
      image: MOCK_PRODUCT.variants[0].image,
      price: MOCK_PRODUCT.price,
      productId: MOCK_PRODUCT.id,
      productName: MOCK_PRODUCT.name,
      quantity: 2,
      selectedColor: MOCK_PRODUCT.variants[0].color,
    },
  };
  const setup = (props: CartItemProps) => render(<CartItem {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup(mockProps);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with the given props', () => {
    const {toJSON} = setup({...mockProps, hasDividerStroke: true});

    expect(toJSON()).toMatchSnapshot();
  });
});
