import type {Meta, StoryObj} from '@storybook/react';
import {StarIcon} from 'src/components/icons';

import CategoryItem from '.';

const meta: Meta<typeof CategoryItem> = {
  title: 'components/common/CategoryItem',
  component: CategoryItem,
};

export default meta;
type Story = StoryObj<typeof CategoryItem>;

export const Primary: Story = {
  render: args => <CategoryItem {...args} Icon={<StarIcon />} />,
  args: {
    title: 'Primary',
    isActive: true,
  },
};

export const Disabled: Story = {
  render: args => <CategoryItem {...args} Icon={<StarIcon />} />,
  args: {
    title: 'Disabled',
  },
};
