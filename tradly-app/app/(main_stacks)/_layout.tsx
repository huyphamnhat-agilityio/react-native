import { useCallback, useMemo } from "react";
import { Stack } from "expo-router";

// Types & Interfaces
import { CategoryRouteParams } from "@/interfaces";

// Components
import { Header } from "@/components/common";
import { useUserStore } from "@/store";
import { isFulfilledObject } from "@/utils";

const MainStacksLayout = () => {
  const userAddress = useUserStore((state) => state.user?.address);

  const handleRenderCartHeader = useCallback(
    () => <Header title="My Cart" includeBackButton isTitleOnly />,
    [],
  );

  const addressHeaderTitle = useMemo(
    () =>
      isFulfilledObject(userAddress) ? "Edit address" : "Add a new address",
    [userAddress],
  );

  const handleRenderAddressHeader = useCallback(
    () => <Header title={addressHeaderTitle} includeBackButton isTitleOnly />,
    [addressHeaderTitle],
  );
  return (
    <Stack>
      <Stack.Screen
        name="category/[category]"
        options={({ route }) => {
          const { category = "" } = route.params as CategoryRouteParams;
          return {
            title: category,
            header: () => (
              <Header
                title={category}
                isTitleOnly
                includeBackButton
                includeFiltersBar
                includeCategorySelection={false}
              />
            ),
          };
        }}
      />

      <Stack.Screen
        name="product/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="cart"
        options={{
          header: handleRenderCartHeader,
        }}
      />

      <Stack.Screen
        name="address"
        options={{
          header: handleRenderAddressHeader,
        }}
      />
    </Stack>
  );
};

export default MainStacksLayout;
