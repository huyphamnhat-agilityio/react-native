import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { memo } from 'react';
import { SCREENS } from 'src/constants';
import { AuthStacksParamList } from 'src/interfaces/navigation';
import { BoardingScreen, LoginScreen, RegisterScreen } from 'src/screens';
import { useUserStore } from 'src/store';

const AuthStack = createNativeStackNavigator<AuthStacksParamList>();

const AuthStacks = memo(() => {
  const isFirstTimeLogin = useUserStore(state => state.isFirstTimeLogin);
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstTimeLogin && (
        <AuthStack.Screen
          name={SCREENS.AUTH.BOARDING}
          component={BoardingScreen}
        />
      )}
      <AuthStack.Screen name={SCREENS.AUTH.LOGIN} component={LoginScreen} />
      <AuthStack.Screen
        name={SCREENS.AUTH.REGISTER}
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  );
});

AuthStacks.displayName = 'AuthStacks';
export default AuthStacks;
