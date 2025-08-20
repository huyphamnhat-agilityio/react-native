import { useInitPushNotifications, useNotificationObserver } from "@/hooks";
import { useScreenDimensions, useUserStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StyleSheet, View } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import { background } from "@/themes";

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      retry: 3,
    },
  },
});

TaskManager.defineTask<Notifications.NotificationTaskPayload>(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error }) => {
    if (error) {
      console.log("Error occured:", error);
    }
    if (data) {
      //
    }
  },
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default function RootLayout() {
  const accessToken = useUserStore((state) => state.accessToken);
  const onLayout = useScreenDimensions((state) => state.onLayout);

  if (__DEV__) {
    import("../ReactotronConfig");
  }

  useInitPushNotifications();
  useNotificationObserver();

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container} onLayout={onLayout}>
          <Stack>
            <Stack.Protected guard={!accessToken}>
              <Stack.Screen
                name="(auth_stacks)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>

            <Stack.Protected guard={!!accessToken}>
              <Stack.Screen
                name="(main_tabs)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>

            <Stack.Protected guard={!!accessToken}>
              <Stack.Screen
                name="(main_stacks)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
          </Stack>
        </View>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background.white,
  },
});
