import { useInitPushNotifications } from "@/hooks";
import { useUserStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";

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
  if (__DEV__) {
    import("../ReactotronConfig");
  }

  useInitPushNotifications();

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Protected guard={!accessToken}>
            <Stack.Screen
              name="(auth_stacks)"
              options={{ headerShown: false }}
            />
          </Stack.Protected>

          <Stack.Protected guard={!!accessToken}>
            <Stack.Screen name="(main_tabs)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!!accessToken}>
            <Stack.Screen
              name="(main_stacks)"
              options={{ headerShown: false }}
            />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}
