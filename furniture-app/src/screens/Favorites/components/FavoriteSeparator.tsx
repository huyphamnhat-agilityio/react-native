import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// Themes
import { colors } from 'src/themes';

const FavoriteSeparator = memo(() => (
  <View style={styles.separatorWrapper}>
    <View style={styles.separator} />
  </View>
));

const styles = StyleSheet.create({
  separatorWrapper: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border.tertiary,
  },
});

FavoriteSeparator.displayName = 'FavoriteSeparator';

export default FavoriteSeparator;
