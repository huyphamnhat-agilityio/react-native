import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { memo } from "react";

// Components
import Text from "../Text";
import Button from "../Button";
import Input from "../Input";

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

export type HeaderProps = {
  isTitleOnly?: boolean;
  title: string;
  includeSearchBar?: boolean;
};
const Header = memo(({ isTitleOnly, title, includeSearchBar }: HeaderProps) => {
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
        />
      )}
    </SafeAreaView>
  );
});

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
