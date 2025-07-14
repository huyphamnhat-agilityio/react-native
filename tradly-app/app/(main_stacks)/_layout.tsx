import { CategoryRouteParams } from "@/interfaces";
import { Stack } from "expo-router";

// Components
import { Header } from "@/components/common";

const MainStacksLayout = () => {
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
    </Stack>
  );
};

export default MainStacksLayout;
