import { useCallback } from "react";
import { Stack } from "expo-router";

// Types & Interfaces
import { CategoryRouteParams } from "@/interfaces";

// Components
import { Header } from "@/components/common";

const MainStacksLayout = () => {
  const handleRenderCartHeader = useCallback(
    () => <Header title="My Cart" includeBackButton isTitleOnly />,
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
          title: "Cart",
          header: handleRenderCartHeader,
        }}
      />
    </Stack>
  );
};

export default MainStacksLayout;
