import type {Meta, StoryObj} from '@storybook/react';

import DeliveryMethodCard from '.';

const meta: Meta<typeof DeliveryMethodCard> = {
  title: 'components/DeliveryMethodCard',
  component: DeliveryMethodCard,
};

export default meta;
type Story = StoryObj<typeof DeliveryMethodCard>;

export const Primary: Story = {};
