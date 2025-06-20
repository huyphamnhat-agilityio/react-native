import { useEffect } from 'react';
import { Linking } from 'react-native';
import { SCREENS, STACKS } from 'src/constants';
import { navigate } from 'src/navigation/navigationConfig';
import { useUserStore } from 'src/store';

export function useHandleInitialURL(isReady: boolean) {
  const accessToken = useUserStore(state => state.accessToken);

  useEffect(() => {
    if (!isReady) return;

    Linking.getInitialURL().then(url => {
      if (url && accessToken) {
        const match = url.match(/ProductDetail\/(\d+)/);
        if (match) {
          const productId = match[1];
          navigate(STACKS.MAIN_STACKS, {
            screen: SCREENS.MAIN.PRODUCT_DETAIL,
            params: { id: productId },
          });
        }
      }
    });
  }, [isReady, accessToken]);
}
