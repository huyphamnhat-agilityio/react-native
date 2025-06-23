import { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Store
import { useUserStore } from 'src/store';

// Types & Interfaces
import { AppStacksParamList } from 'src/interfaces';

import MainStacks from './MainStacks';
import AddressStacks from './AddressStacks';
import AuthStacks from './AuthStacks';
import { STACKS } from 'src/constants';

const AppStack = createNativeStackNavigator<AppStacksParamList>();

const AppStacks = memo(() => {
  const accessToken = useUserStore(state => state.accessToken);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {accessToken ? (
        <>
          <AppStack.Screen name={STACKS.MAIN_STACKS} component={MainStacks} />
          <AppStack.Screen
            name={STACKS.ADDRESS_STACKS}
            component={AddressStacks}
          />
        </>
      ) : (
        <AppStack.Screen name={STACKS.AUTH_STACKS} component={AuthStacks} />
      )}
    </AppStack.Navigator>
  );
});

AppStacks.displayName = 'AppStacks';
export default AppStacks;
