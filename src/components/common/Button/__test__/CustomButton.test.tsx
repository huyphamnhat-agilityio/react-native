import {render, screen} from 'test-utils';
import Button, {ButtonProps} from '..';

describe('Button', () => {
  const setup = (props?: ButtonProps) => render(<Button {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with given props', () => {
    setup({
      title: 'Mock title',
      bgVariant: 'outline',
      textVariant: 'outline',
      isLoading: true,
    });

    expect(screen.getByText('Mock title')).toBeVisible();
  });
});
