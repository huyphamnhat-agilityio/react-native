import type {Meta, StoryObj} from '@storybook/react';
import ProductCard from '.';

const meta: Meta<typeof ProductCard> = {
  title: 'components/common/ProductCard',
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Primary: Story = {
  args: {
    image: 'https://m.media-amazon.com/images/I/711I3okfOpL._AC_SL1500_.jpg',
    name: 'Classic Dining Chair',
    price: 89.99,
  },
};
