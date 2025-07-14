import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

// Services
import { login } from "@/services";

// Store
import { useUserStore } from "@/store";

// Constants
import { SERVER_RESPONSE_MESSAGE } from "@/constants";

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });

export const useHandleExpiredToken = (message?: string) => {
  const clearUserSession = useUserStore((state) => state.clearUserSession);
  useEffect(() => {
    if (message === SERVER_RESPONSE_MESSAGE.JWT_EXPIRED) {
      Alert.alert(
        "Session Expired",
        "Please log in again.",
        [
          {
            text: "Ok",
            onPress: () => clearUserSession(),
          },
        ],
        { cancelable: false },
      );
    }
  }, [clearUserSession, message]);
};
