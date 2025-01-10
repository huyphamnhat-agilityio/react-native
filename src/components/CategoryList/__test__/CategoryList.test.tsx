import {fireEvent, render, screen} from 'test-utils';
import CategoryList, {CategoryListProps} from '..';
import {act} from 'react';

describe('CategoryList', () => {
  const mockCategory = 'Popular';
  const mockSetCategory = jest.fn();
  const setup = (props: CategoryListProps) =>
    render(<CategoryList {...props} />);

  it('should render correctly', () => {
    const {toJSON} = setup({
      category: mockCategory,
      setCategory: mockSetCategory,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it('should invoke the setCategory function when choosing categories', async () => {
    setup({
      category: mockCategory,
      setCategory: mockSetCategory,
    });

    const categories = screen.getAllByTestId('category-item');

    act(() => {
      fireEvent.press(categories[1]);
    });

    expect(mockSetCategory).toHaveBeenCalled();
  });
});
