import { Stack } from "expo-router";
import { useUserStore } from "@/store";

const AuthLayout = () => {
  const isFirstTimeLogin = useUserStore((state) => state.isFirstTimeLogin);
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
        redirect={!isFirstTimeLogin}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
