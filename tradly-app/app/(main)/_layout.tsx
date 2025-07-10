import { Tabs } from "expo-router";

// Components
import { Header } from "@/components/common";

// Icons
import { HomeIcon, SearchIcon } from "@/components/icons";

// Themes
import { fontFamilies, fontSizes, text } from "@/themes";
import { useCallback } from "react";

const AuthLayout = () => {
  const renderHomeTabBarIcon = useCallback(
    ({ color }: { focused: boolean; color: string; size: number }) => {
      return <HomeIcon fill={color} />;
    },
    [],
  );

  const renderBrowseTabBarIcon = useCallback(
    ({ color }: { focused: boolean; color: string; size: number }) => {
      return <SearchIcon fill={color} />;
    },
    [],
  );

  const renderHomeHeader = useCallback(() => {
    return <Header title="Home" />;
  }, []);

  const renderBrowseHeader = useCallback(() => {
    return <Header title="Browse" includeSearchBar includeFiltersBar />;
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: text.primary,
        tabBarInactiveTintColor: text.secondary,
        tabBarLabelStyle: {
          fontFamily: fontFamilies.Montserrat_700Bold,
          fontSize: fontSizes[2.5],
          textAlign: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: renderHomeTabBarIcon,
          header: renderHomeHeader,
        }}
      />

      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: renderBrowseTabBarIcon,
          header: renderBrowseHeader,
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
