import {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {Text, Button} from 'src/components/common';
import {MinusIcon, PlusIcon} from 'src/components/icons';
const QuantityControl = memo(() => {
  return (
    <View style={styles.container}>
      <Button IconLeft={<PlusIcon />} bgVariant="none" style={styles.button} />
      <Text font="NunitoSansSemiBold" size="base">
        01
      </Text>
      <Button IconLeft={<MinusIcon />} bgVariant="none" style={styles.button} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    padding: 0,
  },
});

QuantityControl.displayName = 'QuantityControl';

export default QuantityControl;
