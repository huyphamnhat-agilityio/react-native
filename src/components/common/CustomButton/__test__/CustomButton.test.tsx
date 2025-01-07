import {render, screen} from 'test-utils';
import CustomButton, {CustomButtonProps} from '..';

describe('CustomButton', () => {
  const setup = (props?: CustomButtonProps) =>
    render(<CustomButton {...props} />);

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
