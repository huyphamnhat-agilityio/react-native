import type {Meta, StoryObj} from '@storybook/react';
import ProductCard from '.';
import {MOCK_PRODUCT} from 'src/mocks';

const meta: Meta<typeof ProductCard> = {
  title: 'components/common/ProductCard',
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Primary: Story = {
  args: {
    image: MOCK_PRODUCT.variants[0].image,
    name: 'Classic Dining Chair',
    price: 89.99,
  },
};
