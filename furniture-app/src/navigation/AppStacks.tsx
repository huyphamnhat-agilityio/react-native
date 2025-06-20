import { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Store
import { useUserStore } from 'src/store';

// Types & Interfaces
import { AppStacksParamList } from 'src/interfaces';

import MainStacks from './MainStacks';
import AddressStacks from './AddressStacks';
import AuthStacks from './AuthStacks';

const AppStack = createNativeStackNavigator<AppStacksParamList>();

const AppStacks = memo(() => {
  const accessToken = useUserStore(state => state.accessToken);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <>
          <AppStack.Screen name="MainStacks" component={MainStacks} />
          <AppStack.Screen name="AddressStacks" component={AddressStacks} />
        </>
      ) : (
        <AppStack.Screen name="AuthStacks" component={AuthStacks} />
      )}
    </AppStack.Navigator>
  );
});

AppStacks.displayName = 'AppStacks';
export default AppStacks;
