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

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Protected guard={!accessToken}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={!!accessToken}>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}
