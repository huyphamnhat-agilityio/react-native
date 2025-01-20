import type {Meta, StoryObj} from '@storybook/react';

import TotalCard from '.';

const meta: Meta<typeof TotalCard> = {
  title: 'components/common/TotalCard',
  component: TotalCard,
};

export default meta;
type Story = StoryObj<typeof TotalCard>;

export const Primary: Story = {
  args: {
    order: 123,
    delivery: 4,
  },
};
