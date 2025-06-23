import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Button, Text } from 'src/components/common';

// Icons
import { CartIcon, SearchIcon } from 'src/components/icons';

interface HomeHeaderProps {
  onToggleSearch: () => void;
  onNavigateToCart: () => void;
}

const HomeHeader = memo(
  ({ onToggleSearch, onNavigateToCart }: HomeHeaderProps) => {
    return (
      <View style={styles.header}>
        <SearchIcon onPress={onToggleSearch} />
        <View style={styles.headerTitle}>
          <Text font="GelasioNormal" size="base" textVariant="alternative">
            Make home
          </Text>
          <Text font="GelasioBold" size="base">
            BEAUTIFUL
          </Text>
        </View>
        <Button
          style={styles.button}
          bgVariant="none"
          IconLeft={<CartIcon />}
          onPress={onNavigateToCart}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 0,
    marginTop: 8,
  },
});

HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
