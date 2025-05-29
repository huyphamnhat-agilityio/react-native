import type {Meta, StoryObj} from '@storybook/react';
import QuantityControl from '.';
import {StyleSheet, View} from 'react-native';

const meta: Meta<typeof QuantityControl> = {
  title: 'components/common/QuantityControl',
  component: QuantityControl,
  decorators: Story => (
    <View style={styles.container}>
      <Story />
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 36,
  },
});

export default meta;
type Story = StoryObj<typeof QuantityControl>;

export const Primary: Story = {
  args: {
    quantity: 1,
    max: 999,
    min: 1,
    setQuantity: () => {},
  },
};
