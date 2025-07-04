import { Button } from "@/components/common";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "pink",
      }}
    >
      <Button
        title="Press Me"
        variant="secondary"
        rounded={6}
        style={{
          paddingVertical: 10,
          width: "40%",
          marginHorizontal: "auto",
        }}
      />
    </View>
  );
}
