import type {Meta, StoryObj} from '@storybook/react';
import CartItem from '.';
import {MOCK_PRODUCT} from 'src/mocks';

const meta: Meta<typeof CartItem> = {
  title: 'components/common/CartItem',
  component: CartItem,
};

export default meta;
type Story = StoryObj<typeof CartItem>;

export const Primary: Story = {
  args: {
    data: {
      id: MOCK_PRODUCT.id,
      image: MOCK_PRODUCT.variants[0].image,
      price: MOCK_PRODUCT.price,
      productId: MOCK_PRODUCT.id,
      productName: MOCK_PRODUCT.name,
      quantity: 2,
      selectedColor: MOCK_PRODUCT.variants[0].color,
    },
  },
};

export const HasDivider: Story = {
  args: {
    data: {
      id: MOCK_PRODUCT.id,
      image: MOCK_PRODUCT.variants[0].image,
      price: MOCK_PRODUCT.price,
      productId: MOCK_PRODUCT.id,
      productName: MOCK_PRODUCT.name,
      quantity: 2,
      selectedColor: MOCK_PRODUCT.variants[0].color,
    },
    hasDividerStroke: true,
  },
};
