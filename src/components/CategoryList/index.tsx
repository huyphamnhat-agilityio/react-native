import {memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

// Components
import {CategoryItem} from '../common';

// Constants
import {CATEGORIES} from 'src/constants';

export interface CategoryListProps {
  category?: string;
  setCategory: (category: string) => void;
}
const CategoryList = memo(({category, setCategory}: CategoryListProps) => {
  const handleSetCategory = useCallback(
    (categoryTitle: string) => () => {
      categoryTitle !== category && setCategory(categoryTitle);
    },
    [category, setCategory],
  );
  return (
    <FlatList
      style={styles.container}
      data={CATEGORIES}
      horizontal
      contentContainerStyle={styles.contentContainer}
      renderItem={({item: {icon, title}}) => {
        return (
          <CategoryItem
            isActive={category === title}
            onPress={handleSetCategory(title)}
            Icon={icon}
            title={title}
          />
        );
      }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginTop: 20,
    flexGrow: 0,
  },
  contentContainer: {
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

CategoryList.displayName = 'CategoryList';

export default CategoryList;
