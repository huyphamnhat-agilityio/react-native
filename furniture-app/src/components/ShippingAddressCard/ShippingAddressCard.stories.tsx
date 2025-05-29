import type {Meta, StoryObj} from '@storybook/react';

import ShippingAddressCard from '.';

const meta: Meta<typeof ShippingAddressCard> = {
  title: 'components/ShippingAddressCard',
  component: ShippingAddressCard,
};

export default meta;
type Story = StoryObj<typeof ShippingAddressCard>;

export const Primary: Story = {
  args: {
    name: 'Bruno Fernades',
    address: '25 rue Robert Latouche, Nice, 06200, Côte D’azur, France',
  },
};
