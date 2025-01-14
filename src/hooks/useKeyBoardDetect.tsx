import {useEffect, useState} from 'react';
import {Dimensions, Keyboard} from 'react-native';

export const useKeyBoardDetect = (callback: (...args: any[]) => void) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setIsKeyboardVisible(true);
        callback((e.endCoordinates.screenY - e.endCoordinates.height) * 0.94);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
        callback(Dimensions.get('screen').height * 0.53);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [callback]);

  return isKeyboardVisible;
};
