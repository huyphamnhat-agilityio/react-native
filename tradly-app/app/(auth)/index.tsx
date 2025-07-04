import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { background, borderRadius } from "@/themes";
import { Button, Text } from "@/components/common";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.content}>
        <View style={styles.contentWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: "onboarding_one" }}
              contentFit="contain"
              style={styles.image}
            />
          </View>

          <Text style={styles.description} font="Montserrat_500Medium" size={5}>
            Empowering Artisans, Farmers & Micro Business
          </Text>
        </View>
        <Button
          variant="primary"
          titleFont="Montserrat_600SemiBold"
          rounded={6}
          title="Next"
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: background.white,
    position: "relative",
  },
  background: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "45%",
    backgroundColor: background.primary,
  },
  content: {
    paddingHorizontal: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 40,
  },
  description: {
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 30,
  },
  imageWrapper: {
    paddingTop: 50,
    backgroundColor: background.white,
    borderRadius: borderRadius[2],
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
  },
  image: {
    width: 300,
    height: 240,
  },
});
export default Onboarding;
