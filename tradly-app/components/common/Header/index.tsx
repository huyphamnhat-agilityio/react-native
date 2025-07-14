import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { memo, useEffect } from "react";

// Components
import Text from "../Text";
import Button from "../Button";
import Input from "../Input";
import FiltersBar from "../FiltersBar";

// Icons
import { WishlistIcon, CartIcon, SearchIcon } from "@/components/icons";

// Themes
import {
  background,
  borderRadius,
  fontFamilies,
  fontSizes,
  text,
} from "@/themes";
import { useDebounce } from "@/hooks";
import { useFilterStore } from "@/store";

export type HeaderProps = {
  isTitleOnly?: boolean;
  title: string;
  includeSearchBar?: boolean;
  includeFiltersBar?: boolean;
};
const Header = memo(
  ({
    isTitleOnly,
    title,
    includeSearchBar,
    includeFiltersBar,
  }: HeaderProps) => {
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
    const {
      value: search,
      debouncedValue: debouncedSearch,
      setValue: setSearch,
    } = useDebounce("", 500);

    useEffect(() => {
      setSearchQuery(debouncedSearch);
    }, [debouncedSearch, setSearchQuery]);
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <View
          style={[
            styles.inner,
            { justifyContent: isTitleOnly ? "center" : "space-between" },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          {isTitleOnly ? null : (
            <View style={styles.actions}>
              <Button IconLeft={<WishlistIcon />} />
              <Button IconLeft={<CartIcon />} />
            </View>
          )}
        </View>

        {includeSearchBar && (
          <Input
            LeftContent={<SearchIcon />}
            placeholder="Search Product"
            placeholderTextColor={text.alternative}
            font="Montserrat_500Medium"
            inputSize={4.5}
            inputVariant="black"
            wrapperStyle={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        )}

        {includeFiltersBar && <FiltersBar />}
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: background.primary,
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inner: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: background.white,
    fontFamily: fontFamilies.Montserrat_700Bold,
    fontSize: fontSizes[6],
  },
  actions: {
    flexDirection: "row",
    gap: 16,
  },
  input: {
    paddingLeft: 16,
    paddingVertical: 12,
    borderRadius: borderRadius[6],
    backgroundColor: background.white,
    gap: 20,
  },
});

Header.displayName = "Header";

export default Header;
