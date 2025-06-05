import {memo, useCallback} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

// Components
import {Text, Button} from '../common';

// Types & Interfaces
import {TextVariant} from 'src/interfaces';
import {ButtonProps} from '../common/Button';

export type CategoryItemProps = ViewProps & {
  Icon: React.ReactElement;
  isActive?: boolean;
  onPress?: (category: string) => void;
  title?: string;
};
const CategoryItem = memo(
  ({Icon, isActive = false, onPress, title = ''}: CategoryItemProps) => {
    const buttonVariant: ButtonProps['bgVariant'] = isActive
      ? 'primary'
      : 'disabled';

    const titleVariant: TextVariant = isActive ? 'primary' : 'disabled';

    const handlePressCategory = useCallback(() => {
      onPress?.(title);
    }, [onPress, title]);
    return (
      <View style={styles.container}>
        <Button
          IconLeft={Icon}
          style={styles.button}
          bgVariant={buttonVariant}
          onPress={handlePressCategory}
          rounded="lg"
          testID="category-item"
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
