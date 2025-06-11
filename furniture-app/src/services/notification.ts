import {getMessaging, getToken} from '@react-native-firebase/messaging';

const messaging = getMessaging();

export const onRegisterFirebaseMessaging = async () => {
  try {
    const token = await getToken(messaging);
    console.log('FCM Token:', token);
  } catch (error) {
    console.error('Error when getting FCM token:', error);
    return null;
  }
};
