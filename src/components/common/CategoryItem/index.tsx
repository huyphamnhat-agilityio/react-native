import {Pressable, StyleSheet} from 'react-native';
import {StarIcon} from 'src/components/icons/StarIcon';
import Button from '../Button';
import Text from '../Text';

const CategoryItem = () => {
  return (
    <Pressable style={styles.container}>
      <Button
        IconLeft={<StarIcon />}
        style={styles.button}
        bgVariant="secondary"
        rounded="lg"
      />
      <Text font="NunitoSansSemiBold" size="xs">
        Popular
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
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
export default CategoryItem;
