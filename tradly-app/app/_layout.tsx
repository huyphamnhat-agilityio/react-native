import { usePushNotifications } from "@/hooks";
import { useUserStore } from "@/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      retry: 3,
    },
  },
});
export default function RootLayout() {
  const accessToken = useUserStore((state) => state.accessToken);
  if (__DEV__) {
    import("../ReactotronConfig");
  }

  usePushNotifications();

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
