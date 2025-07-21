import { Alert, Linking } from "react-native";

export const handleNeverAskAgain = (permissionName: string) => {
  Alert.alert(
    "Permission Required",
    `${permissionName} permission has been permanently denied. Please enable it from App Settings.`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Open Settings",
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
  );
};
