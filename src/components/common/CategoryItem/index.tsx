import {memo} from 'react';
import {PressableProps, StyleSheet, View} from 'react-native';

// Components
import Button, {ButtonProps} from '../Button';
import Text from '../Text';

// Types & Interfaces
import {TextVariant} from 'src/interfaces';

export interface CategoryItemProps extends PressableProps {
  Icon: React.ReactElement;
  isActive?: boolean;
  onPress?: () => void;
  title?: string;
}
const CategoryItem = memo(
  ({
    Icon,
    isActive = false,
    onPress = () => {},
    title = '',
  }: CategoryItemProps) => {
    const buttonVariant: ButtonProps['bgVariant'] = isActive
      ? 'primary'
      : 'disabled';

    const titleVariant: TextVariant = isActive ? 'primary' : 'disabled';
    return (
      <View style={styles.container}>
        <Button
          IconLeft={Icon}
          style={styles.button}
          bgVariant={buttonVariant}
          onPress={onPress}
          rounded="lg"
        />
        <Text font="NunitoSansSemiBold" textVariant={titleVariant} size="xs">
          {title}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    marginHorizontal: 'auto',
    padding: 12,
  },
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;
