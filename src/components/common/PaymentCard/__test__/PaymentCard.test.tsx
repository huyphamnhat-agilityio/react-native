import {render} from 'test-utils';
import PaymentCard, {PaymentCardProps} from '..';

describe('Button', () => {
  const setup = (props: PaymentCardProps) => render(<PaymentCard {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup({number: '**** **** **** 3947'});
    expect(toJSON()).toMatchSnapshot();
  });
});
