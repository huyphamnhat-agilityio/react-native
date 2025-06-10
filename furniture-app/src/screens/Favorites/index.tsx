import {useCallback} from 'react';
import {
  ActivityIndicator,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

// Components
import {FavoriteItem, FavoriteList} from 'src/components';
import {Text} from 'src/components/common';

// Hooks
import {useGetFavorites} from 'src/hooks';

// Types & Interfaces
import {Product} from 'src/interfaces';

// Store
import {useUserStore} from 'src/store';

// Themes
import {colors} from 'src/themes';

const FavoritesScreen = () => {
  const userId = useUserStore(state => state.user?.id) ?? '';

  const {
    data,
    isLoading,
    error: getFavoritesError,
  } = useGetFavorites({
    id: userId,
  });

  const {items = []} = data || {};

  const handleRenderItem = useCallback(
    ({item}: ListRenderItemInfo<Product>) => (
      <FavoriteItem key={item.id} data={item} />
    ),
    [],
  );

  const FavoriteSeparatorComponent = useCallback(
    () => (
      <View style={styles.separatorWrapper}>
        <View style={styles.separator} />
      </View>
    ),
    [],
  );
  return (
    <View style={styles.container}>
      {(() => {
        if (getFavoritesError?.message) {
          return (
            <Text style={styles.message}>{getFavoritesError.message}</Text>
          );
        }
        if (isLoading) {
          return (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator size="large" color="black" />
            </View>
          );
        }
        return (
          <FavoriteList
            removeClippedSubviews={false}
            data={items}
            renderItem={handleRenderItem}
            ItemSeparatorComponent={FavoriteSeparatorComponent}
          />
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
  },
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
  message: {
    flex: 1,
    textAlign: 'center',
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
