import { Button, Input, Text } from "@/components/common";
import { borderRadius, colors } from "@/themes";
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

      <Text font="Montserrat_900Black_Italic">Hello World</Text>
      <Input
        wrapperStyle={{
          padding: 10,
          borderWidth: 1,
          borderColor: colors.white,
          borderRadius: borderRadius[6],
        }}
        isError
        errorMessage="This is an error message"
        errorStyle={{
          paddingLeft: 10,
        }}
      />
    </View>
  );
}
