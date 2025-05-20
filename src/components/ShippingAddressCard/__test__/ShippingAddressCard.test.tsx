import {render} from 'test-utils';
import ShippingAddressCard, {ShippingAddressCardProps} from '..';

describe('ShippingAddressCard', () => {
  const setup = (props: ShippingAddressCardProps) =>
    render(<ShippingAddressCard {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup({
      name: 'mock',
      address: 'mock',
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
