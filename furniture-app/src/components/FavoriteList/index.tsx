import {FlatList, FlatListProps, StyleSheet} from 'react-native';

// Types & Interfaces
import {Product} from 'src/interfaces';

// Components
import {Text} from '../common';

export type FavoriteListProps = FlatListProps<Product>;

const FavoriteList = ({contentContainerStyle, ...props}: FavoriteListProps) => {
  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={
        <Text style={styles.text}>No product was marked as favorite.</Text>
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

export default FavoriteList;
