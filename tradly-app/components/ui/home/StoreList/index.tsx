import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Components
import { Button, Text } from "@/components/common";
import StoreCardList from "./StoreCardList";

// Mocks
import { MOCK_STORES } from "@/mocks";

// Themes
import { background } from "@/themes";

// Store
import { useScreenDimensions } from "@/store";

// Constants
import { TABLET_DEVICE_WIDTH } from "@/constants";

export type StoreListProps = {
  style?: StyleProp<ViewStyle>;
};

const StoreList = ({ style }: StoreListProps) => {
  const { screenWidth } = useScreenDimensions();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.background} />
      <View style={[styles.wrapper]}>
        <View style={styles.header}>
          <Text
            textVariant="white"
            font="Montserrat_700Bold"
            size={screenWidth >= TABLET_DEVICE_WIDTH ? 6 : 4.5}
          >
            Store to follow
          </Text>
          <Button
            title="View All"
            variant="secondary"
            titleSize={screenWidth >= TABLET_DEVICE_WIDTH ? 5 : 3.5}
            rounded={6}
            style={styles.button}
          />
        </View>
        <StoreCardList data={MOCK_STORES} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  wrapper: {
    flexDirection: "column",
    gap: 16,
    padding: 20,
  },

  background: {
    position: "absolute",
    width: "100%",
    height: "70%",
    backgroundColor: background.primary,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  button: {
    paddingHorizontal: 20,
  },
});

export default StoreList;
