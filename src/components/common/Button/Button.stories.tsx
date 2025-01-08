import type {Meta, StoryObj} from '@storybook/react';
import Button from '.';
import {ActivityIndicator} from 'react-native';

const meta: Meta<typeof Button> = {
  title: 'components/common/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Primary',
  },
};

export const Outline: Story = {
  args: {
    title: 'Outline',
    bgVariant: 'outline',
    textVariant: 'outline',
  },
};

export const Rounded: Story = {
  args: {
    title: 'Rounded',
    rounded: 'lg',
  },
};

export const LeftIcon: Story = {
  render: args => <Button {...args} IconLeft={<ActivityIndicator />} />,
  args: {
    title: 'LeftIcon',
  },
};

export const RightIcon: Story = {
  render: args => <Button {...args} IconRight={<ActivityIndicator />} />,
  args: {
    title: 'RightIcon',
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled',
    disabled: true,
  },
};
