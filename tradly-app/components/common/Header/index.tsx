import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { memo, useCallback, useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

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

// Hooks
import { useDebounce } from "@/hooks";

// Store
import { useFilterStore } from "@/store";
import Animated, { FadeIn } from "react-native-reanimated";

export type HeaderProps = {
  isTitleOnly?: boolean;
  title: string;
  includeBackButton?: boolean;
  includeSearchBar?: boolean;
  includeFiltersBar?: boolean;
  includeCategorySelection?: boolean;
};
const Header = memo(
  ({
    isTitleOnly,
    title,
    includeBackButton,
    includeSearchBar,
    includeFiltersBar,
    includeCategorySelection = true,
  }: HeaderProps) => {
    const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
    const {
      value: search,
      debouncedValue: debouncedSearch,
      setValue: setSearch,
    } = useDebounce("", 500);

    const { back, canGoBack, navigate } = useRouter();

    const handleGoBack = useCallback(() => {
      if (canGoBack()) {
        back();
      } else {
        navigate("/(main_tabs)");
      }
    }, [back, canGoBack, navigate]);

    const handleNavigateToCart = useCallback(() => {
      navigate("/cart");
    }, [navigate]);

    useEffect(() => {
      setSearchQuery(debouncedSearch);
    }, [debouncedSearch, setSearchQuery]);
    return (
      <SafeAreaView edges={["top"]} style={styles.container}>
        <Animated.View
          entering={FadeIn.duration(500)}
          style={[
            styles.inner,
            { justifyContent: isTitleOnly ? "center" : "space-between" },
          ]}
        >
          {includeBackButton && (
            <Button
              IconLeft={<AntDesign name="arrowleft" size={24} color="white" />}
              style={styles.backButton}
              onPress={handleGoBack}
            />
          )}

          <Text style={styles.title}>{title}</Text>

          {isTitleOnly ? null : (
            <View style={styles.actions}>
              <Button IconLeft={<WishlistIcon />} />
              <Button IconLeft={<CartIcon />} onPress={handleNavigateToCart} />
            </View>
          )}
        </Animated.View>

        {includeSearchBar && (
          <Input
            LeftContent={<SearchIcon />}
            placeholder="Search Product"
            placeholderTextColor={text.alternative}
            inputSize={4.5}
            inputVariant="black"
            wrapperStyle={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        )}

        {includeFiltersBar && (
          <FiltersBar includeCategorySelection={includeCategorySelection} />
        )}
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
  backButton: {
    position: "absolute",
    top: "30%",
    left: 0,
    padding: 0,
  },
});

Header.displayName = "Header";

export default Header;
