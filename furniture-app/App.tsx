import { getMessaging } from '@react-native-firebase/messaging';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { DevSettings } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Navigation from 'src/navigation';
import { onMessageReceived } from 'src/services';
import notifee, { EventType } from '@notifee/react-native';
import { navigate } from 'src/navigation/navigationConfig';
import { SCREENS, STACKS } from 'src/constants';

getMessaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (
    type === EventType.PRESS &&
    detail.notification?.data?.type === 'ProductDetail'
  ) {
    const id = detail.notification.data.id;

    navigate(STACKS.MAIN_STACKS, {
      screen: SCREENS.MAIN.PRODUCT_DETAIL,
      params: { id },
    });
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      retry: 3,
    },
  },
});

function App(): React.JSX.Element {
  const [showStorybook, setShowStorybook] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  if (showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }

  return (
    <KeyboardProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <Navigation />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </KeyboardProvider>
  );
}

export default App;
