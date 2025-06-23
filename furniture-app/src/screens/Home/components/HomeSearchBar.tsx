import { memo } from 'react';
import { Animated, StyleSheet } from 'react-native';

// Components
import { TextInput } from 'src/components/common';

export type HomeSearchBarProps = {
  searchHeight: Animated.AnimatedInterpolation<string | number>;
  searchOpacity: Animated.AnimatedInterpolation<string | number>;
  searchQuery: string;
  onChangeQuery: (text: string) => void;
};

const HomeSearchBar = memo(
  ({
    searchHeight,
    searchOpacity,
    searchQuery,
    onChangeQuery,
  }: HomeSearchBarProps) => {
    return (
      <Animated.View
        style={[
          styles.searchContainer,
          {
            height: searchHeight,
            opacity: searchOpacity,
          },
        ]}
      >
        <TextInput
          inputSize="sm"
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={onChangeQuery}
          autoCapitalize="none"
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  searchContainer: {
    overflow: 'hidden',
  },
});

HomeSearchBar.displayName = 'HomeSearchBar';

export default HomeSearchBar;
