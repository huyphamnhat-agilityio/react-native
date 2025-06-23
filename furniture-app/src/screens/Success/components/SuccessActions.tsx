import { StyleSheet, View } from 'react-native';
import { Button } from 'src/components/common';
import { colors } from 'src/themes';
import { MEDIUM_DEVICE_HEIGHT } from 'src/constants';

interface Props {
  onGoBack: () => void;
}

const SuccessActions = ({ onGoBack }: Props) => {
  return (
    <View style={styles.buttonSection}>
      <Button
        style={[styles.button, styles.shadow]}
        width="100%"
        title="Track your orders"
        titleFont="NunitoSansSemiBold"
        titleSize="base"
        rounded="md"
      />
      <Button
        style={styles.button}
        onPress={onGoBack}
        width="100%"
        title="BACK TO HOME"
        titleFont="NunitoSansSemiBold"
        titleSize="base"
        bgVariant="outline"
        textVariant="outline"
        rounded="md"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSection: {
    width: '100%',
    gap: MEDIUM_DEVICE_HEIGHT ? 25 : 12,
  },
  button: {
    paddingVertical: 18,
  },
  shadow: {
    elevation: 10,
    shadowColor: colors.shadow.primary,
    zIndex: 99,
  },
});

export default SuccessActions;
