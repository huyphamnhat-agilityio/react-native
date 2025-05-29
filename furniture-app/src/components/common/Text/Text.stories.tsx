import type {Meta, StoryObj} from '@storybook/react';
import Text from '.';

const meta: Meta<typeof Text> = {
  title: 'components/common/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'Extra Small',
  },
};

export const Base: Story = {
  args: {
    size: 'base',
    children: 'Base',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large',
  },
};

export const CustomFont: Story = {
  args: {
    font: 'MerriweatherBold',
    children: 'Custom Font',
  },
};
