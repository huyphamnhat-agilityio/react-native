import {render, screen} from 'test-utils';
import TextInput, {TextInputProps} from '..';

describe('TextInput', () => {
  const setup = (props?: TextInputProps) => render(<TextInput {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup();
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with given props', () => {
    setup({
      font: 'GelasioBold',
      value: 'Mock value',
      label: 'Mock label',
      isDisabled: true,
    });

    expect(screen.getByDisplayValue('Mock value')).toBeVisible();
  });

  it('should display error message properly', () => {
    setup({
      isError: true,
      errorMessage: 'Mock error message',
    });

    expect(screen.getByText('Mock error message')).toBeVisible();
  });
});
