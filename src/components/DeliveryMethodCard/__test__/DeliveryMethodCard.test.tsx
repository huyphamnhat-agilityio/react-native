import {render} from 'test-utils';
import DeliveryMethodCard from '..';

describe('ShippingAddressCard', () => {
  const setup = () => render(<DeliveryMethodCard />);

  it('should render correctly', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });
});
