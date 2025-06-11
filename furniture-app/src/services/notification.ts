import {
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

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

export const onMessageReceived = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  console.log('Received message:', message);
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId: channelId,
    },
  });
};
