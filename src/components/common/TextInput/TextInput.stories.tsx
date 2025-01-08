import type {Meta, StoryObj} from '@storybook/react';
import TextInput from '.';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const meta: Meta<typeof TextInput> = {
  title: 'components/common/TextInput',
  component: TextInput,
  decorators: Story => (
    <View style={styles.container}>
      <Story />
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Primary: Story = {
  args: {},
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
    labelSize: 'xs',
  },
};

export const WithError: Story = {
  args: {
    isError: true,
    errorMessage: 'Error message',
  },
};

export const IsDisabled: Story = {
  args: {
    isDisabled: true,
    value: 'Disabled',
  },
};

export const IsLoading: Story = {
  args: {
    isLoading: true,
    value: 'Loading...',
  },
};

export const WithLeftContent: Story = {
  render: args => <TextInput {...args} LeftContent={<ActivityIndicator />} />,
  args: {
    value: 'Left Content',
  },
};

export const WithRightContent: Story = {
  render: args => <TextInput {...args} RightContent={<ActivityIndicator />} />,
  args: {
    value: 'Right Content',
  },
};
