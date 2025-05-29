import type {Meta, StoryObj} from '@storybook/react';

import CategoryList from '.';

const meta: Meta<typeof CategoryList> = {
  title: 'components/CategoryList',
  component: CategoryList,
};

export default meta;
type Story = StoryObj<typeof CategoryList>;

export const Primary: Story = {
  args: {
    category: 'Popular',
    setCategory: () => {},
  },
};
