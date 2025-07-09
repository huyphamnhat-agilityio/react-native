import { Tabs } from "expo-router";

// Components
import { Header } from "@/components/common";

// Icons
import { HomeIcon } from "@/components/icons";

// Themes
import { fontFamilies, fontSizes, text } from "@/themes";
import { useCallback } from "react";

const AuthLayout = () => {
  const renderTabBarIcon = useCallback(
    ({ color }: { focused: boolean; color: string; size: number }) => {
      return <HomeIcon fill={color} />;
    },
    [],
  );

  const renderHeader = useCallback(() => {
    return <Header title="Home" />;
  }, []);
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: text.primary,
          tabBarInactiveTintColor: text.secondary,
          tabBarLabelStyle: {
            fontFamily: fontFamilies.Montserrat_700Bold,
            fontSize: fontSizes[2.5],
            textAlign: "center",
          },
          tabBarIcon: renderTabBarIcon,
          header: renderHeader,
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
