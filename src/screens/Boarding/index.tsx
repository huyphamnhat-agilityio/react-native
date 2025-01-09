import {useCallback} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

// Components
import {Button, Text} from 'src/components/common';
import {SCREENS} from 'src/constants';
import {StackNavigation} from 'src/interfaces';
export interface BoardingScreenProps {
  navigation: StackNavigation;
}
const BoardingScreen = ({navigation: {navigate}}: BoardingScreenProps) => {
  const handlePress = useCallback(() => {
    navigate(SCREENS.LOGIN);
  }, [navigate]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('assets/images/boarding-background.webp')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text font="GelasioSemiBold" size="lg" textVariant="tertiary">
                MAKE YOUR
              </Text>

              <Text font="GelasioBold" size="xl" textVariant="secondary">
                HOME BEAUTIFUL
              </Text>
            </View>

            <Text
              style={styles.description}
              font="NuniToSansNormal"
              size="base"
              textVariant="quaternary">
              The best simple place where you discover most wonderful furnitures
              and make your home beautiful
            </Text>
          </View>
          <Button
            titleFont="GelasioSemiBold"
            titleSize="base"
            title="Get Started"
            rounded="xs"
            style={styles.button}
            onPress={handlePress}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginBottom: 150,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 148,
  },
  title: {
    paddingLeft: 30,
    marginBottom: 35,
    gap: 16,
  },
  description: {
    paddingLeft: 60,
    paddingRight: 30,
    textAlign: 'justify',
    lineHeight: 35,
  },
  button: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    alignSelf: 'center',
  },
});

export default BoardingScreen;
