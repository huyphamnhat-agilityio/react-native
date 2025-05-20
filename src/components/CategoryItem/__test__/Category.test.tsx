import {fireEvent, render, screen} from 'test-utils';
import CategoryItem, {CategoryItemProps} from '..';
import {StarIcon} from 'src/components/icons';
import {act} from 'react';

describe('CategoryItem', () => {
  const setup = (props: CategoryItemProps) =>
    render(<CategoryItem {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup({
      Icon: <StarIcon />,
      isActive: true,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with given props', async () => {
    const mockPress = jest.fn();

    setup({
      Icon: <StarIcon />,
      title: 'Mock title',
      onPress: mockPress,
    });

    expect(screen.getByText('Mock title')).toBeVisible();
  });

  it('should invoke onPress function when being clicked', async () => {
    const mockPress = jest.fn();

    setup({
      Icon: <StarIcon />,
      title: 'Mock title',
      onPress: mockPress,
    });

    const category = screen.getByTestId('category-item');

    act(() => {
      fireEvent.press(category);
    });

    expect(mockPress).toHaveBeenCalled();
  });
});
