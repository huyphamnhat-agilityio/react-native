import {render, screen} from 'test-utils';
import Text, {TextProps} from '..';

describe('Text', () => {
  const setup = (props?: TextProps) => render(<Text {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with given props', () => {
    setup({
      font: 'GelasioBold',
      children: 'Mock title',
      size: 'xs',
    });

    expect(screen.getByText('Mock title')).toBeVisible();
  });
});
