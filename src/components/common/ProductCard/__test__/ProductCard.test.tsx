import {fireEvent, render, screen} from 'test-utils';
import ProductCard, {ProductCardProps} from '..';
import {act} from 'react';

describe('Button', () => {
  const mockOnPress = jest.fn();
  const mockProps: ProductCardProps = {
    image: require('assets/images/boarding-background.webp'),
    name: 'Mock',
    price: 10,
    onPress: mockOnPress,
  };
  const setup = (props: ProductCardProps) => render(<ProductCard {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup(mockProps);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should invoke onPress function when clicking the button', () => {
    setup(mockProps);

    const button = screen.getByTestId('add-to-cart');

    act(() => fireEvent.press(button));

    expect(mockOnPress).toHaveBeenCalled();
  });
});
