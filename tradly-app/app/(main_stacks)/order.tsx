import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

// Themes
import { background } from "@/themes";

// Components
import { Button, Text } from "@/components/common";

// Hooks
import { useScreenDimensions } from "@/store";

const Order = () => {
  const { back, canGoBack, navigate } = useRouter();
  const { screenWidth } = useScreenDimensions();
  const handleNavigateBack = () => {
    if (canGoBack()) {
      back();
    } else {
      navigate("/(main_tabs)");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source="order_success"
          contentFit="cover"
          style={{
            width: screenWidth * 0.4,
            height: screenWidth * 0.24,
          }}
        />
        <Text
          font="Montserrat_700Bold"
          size={6}
          textVariant="quaternary"
          style={styles.textCentered}
        >
          Thanks for order
        </Text>
      </View>
      <Button
        rounded="full"
        title="Back to home"
        titleFont="Montserrat_600SemiBold"
        titleSize={4.5}
        style={styles.button}
        onPress={handleNavigateBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 24,
  },
  wrapper: {
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textCentered: {
    textAlign: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
  },
});
export default Order;
