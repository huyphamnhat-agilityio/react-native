import {memo, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';

// Components
import {CategoryItem} from '../common';

// Constants
import {CATGORIES} from 'src/constants';

export interface CategoryListProps extends Partial<FlatList> {
  category?: string;
  setCategory: (category: string) => void;
}
const CategoryList = memo(
  ({category, setCategory, ...props}: CategoryListProps) => {
    const handleSetCategory = useCallback(
      (categoryTitle: string) => () => {
        categoryTitle !== category && setCategory(categoryTitle);
      },
      [category, setCategory],
    );
    return (
      <FlatList
        style={styles.container}
        data={CATGORIES}
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
        {...props}
      />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    height: 80,
    marginTop: 20,
  },
  contentContainer: {
    gap: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

CategoryList.displayName = 'CategoryList';

export default CategoryList;
