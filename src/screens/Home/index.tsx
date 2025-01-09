import {StyleSheet, View} from 'react-native';
import {CategoryItem, Text} from 'src/components/common';
import {CartIcon, SearchIcon} from 'src/components/icons';
import {colors} from 'src/themes';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchIcon />
        <View style={styles.headerTitle}>
          <Text font="GelasioNormal" size="base" textVariant="alternative">
            Make home
          </Text>
          <Text font="GelasioBold" size="base">
            BEAUTIFUL
          </Text>
        </View>
        <CartIcon />
      </View>

      <CategoryItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
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
});

export default HomeScreen;
