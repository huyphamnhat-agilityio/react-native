import {
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import {
  getCrashlytics,
  recordError,
} from '@react-native-firebase/crashlytics';
import { colors } from 'src/themes';

const messaging = getMessaging();

export const onRegisterFirebaseMessaging = async () => {
  try {
    const token = await getToken(messaging);
    console.log('FCM Token:', token);
  } catch (error) {
    console.error('Error when getting FCM token:', error);
    recordError(getCrashlytics(), error as Error);
    return null;
  }
};

export const onMessageReceived = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelId = await notifee.createChannel({
    id: 'firebase',
    name: 'Firebase Channel',
    importance: AndroidImportance.HIGH,
  });

  notifee.displayNotification({
    title: message.notification?.title,
    body: message.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_notification',
      color: colors.black,
      pressAction: {
        id: channelId,
        launchActivity: 'default',
      },
      importance: AndroidImportance.HIGH,
    },
    data: {
      type: message.data?.type ?? '',
      id: message.data?.id ?? '',
    },
  });
};
