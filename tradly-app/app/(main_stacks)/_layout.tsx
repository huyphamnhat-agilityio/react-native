import { useCallback, useMemo } from "react";
import { Stack } from "expo-router";

// Types & Interfaces
import { CategoryRouteParams } from "@/interfaces";

// Components
import { Header } from "@/components/common";

// Store
import { useUserStore } from "@/store";

// Utils
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

  const handleRenderPaymentHeader = useCallback(
    () => <Header title="Payment Option" includeBackButton isTitleOnly />,
    [],
  );

  const handleRenderCardHeader = useCallback(
    () => <Header title="Add Card" includeBackButton isTitleOnly />,
    [],
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

      <Stack.Screen
        name="payment"
        options={{
          header: handleRenderPaymentHeader,
        }}
      />

      <Stack.Screen
        name="card"
        options={{
          header: handleRenderCardHeader,
        }}
      />

      <Stack.Screen
        name="order"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MainStacksLayout;
