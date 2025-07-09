import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import Text from "../Text";
import Button from "../Button";

// Icons
import { WishlistIcon, CartIcon } from "@/components/icons";

// Themes
import { background, fontFamilies, fontSizes } from "@/themes";
import { memo } from "react";

export type HeaderProps = {
  isTitleOnly?: boolean;
  title: string;
};
const Header = memo(({ isTitleOnly, title }: HeaderProps) => {
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
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: background.primary,
  },
  inner: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
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
});

Header.displayName = "Header";

export default Header;
