// BoardingButton.tsx
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'src/components/common';

export type BoardingButtonProps = {
  onPress: () => void;
};

const BoardingButton = memo(({ onPress }: BoardingButtonProps) => {
  return (
    <View style={styles.wrapper}>
      <Button
        titleFont="GelasioSemiBold"
        titleSize="base"
        title="Get Started"
        rounded="xs"
        style={styles.button}
        onPress={onPress}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: { flex: 1 / 1.25, justifyContent: 'center' },
  button: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    alignSelf: 'center',
  },
});

BoardingButton.displayName = 'BoardingButton';

export default BoardingButton;
