import {render} from 'test-utils';
import TotalCard, {TotalCardProps} from '..';

describe('TotalCard', () => {
  const setup = (props: TotalCardProps) => render(<TotalCard {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup({
      delivery: 123,
      order: 4,
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
