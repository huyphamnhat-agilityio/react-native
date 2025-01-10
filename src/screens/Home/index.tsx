import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CategoryList} from 'src/components';

// Components
import {Text} from 'src/components/common';
import {CartIcon, SearchIcon} from 'src/components/icons';

// Themes
import {colors} from 'src/themes';

const HomeScreen = () => {
  const [category, setCategory] = useState('Popular');
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

      <CategoryList category={category} setCategory={setCategory} />
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
