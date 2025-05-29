import {fireEvent, render, screen} from 'test-utils';
import QuantityControl, {QuantityControlProps} from '..';
import {act} from 'react';

describe('QuantityControl', () => {
  const mockSetQuantity = jest.fn();

  const mockProps: QuantityControlProps = {
    min: 1,
    max: 999,
    quantity: 1,
    setQuantity: mockSetQuantity,
  };

  const setup = (props: QuantityControlProps) =>
    render(<QuantityControl {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const {toJSON} = setup(mockProps);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly without given quantity', () => {
    const {toJSON} = setup({
      ...mockProps,
      quantity: undefined,
      max: undefined,
      min: undefined,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should disable the plus button when quantity is maximum', () => {
    setup({...mockProps, quantity: 999});

    expect(screen.getByTestId('increase-quantity')).toBeDisabled();
  });

  it('should disable the minus button when quantity is minimum', () => {
    setup({...mockProps, quantity: 1});

    expect(screen.getByTestId('decrease-quantity')).toBeDisabled();
  });

  it('should change the quantity when tapping the buttons', () => {
    setup(mockProps);

    const plusButton = screen.getByTestId('increase-quantity');

    act(() => {
      fireEvent.press(plusButton);
    });

    expect(mockSetQuantity).toHaveBeenCalled();
  });

  it('should change the quantity when typing the quantity input', () => {
    setup(mockProps);

    const quantityInput = screen.getByTestId('quantity-input');

    act(() => {
      fireEvent.changeText(quantityInput, '123');
    });

    expect(mockSetQuantity).toHaveBeenCalled();
  });
});
