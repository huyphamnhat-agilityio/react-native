import type {Meta, StoryObj} from '@storybook/react';

import PaymentCard from '.';

const meta: Meta<typeof PaymentCard> = {
  title: 'components/PaymentCard',
  component: PaymentCard,
};

export default meta;
type Story = StoryObj<typeof PaymentCard>;

export const Primary: Story = {
  args: {
    number: '**** **** **** 3947',
  },
};
