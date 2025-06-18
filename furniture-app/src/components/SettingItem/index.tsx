import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { colors } from 'src/themes';

// Components
import { Button, Text } from '../common';
import { BackArrowIcon } from '../icons';

export type SettingItemProps = {
  title: string;
  description: string;
  handlePress?: () => void;
};
const SettingItem = ({ title, description, handlePress }: SettingItemProps) => {
  return (
    <TouchableHighlight
      underlayColor={colors.white}
      style={styles.container}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <Text font="NunitoSansBold" size="base">
            {title}
          </Text>
          <Text font="NunitoSansNormal" size="tiny" textVariant="quaternary">
            {description}
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={handlePress}
          bgVariant="none"
          IconRight={<BackArrowIcon />}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: colors.shadow.primary,
    elevation: 40,
    backgroundColor: '#fff',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    gap: 5,
  },
  button: {
    marginVertical: 'auto',
    transform: [{ rotate: '180deg' }],
    padding: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export default SettingItem;
