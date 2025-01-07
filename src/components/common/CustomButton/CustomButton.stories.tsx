import type {Meta, StoryObj} from '@storybook/react';
import CustomButton from '.';
import {ActivityIndicator} from 'react-native';

const meta: Meta<typeof CustomButton> = {
  title: 'components/common/CustomButton',
  component: CustomButton,
  argTypes: {
    IconLeft: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

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
  render: args => <CustomButton {...args} IconLeft={<ActivityIndicator />} />,
  args: {
    title: 'LeftIcon',
  },
};

export const RightIcon: Story = {
  render: args => <CustomButton {...args} IconRight={<ActivityIndicator />} />,
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
