import {memo, useCallback} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
// Components
import {Button, Text} from 'src/components/common';

// Constants
import {SCREENS} from 'src/constants';

// Interfaces
import {AppStackScreenProps} from 'src/interfaces';

const BoardingScreen = memo(
  ({navigation: {navigate}}: AppStackScreenProps<'Boarding'>) => {
    const handlePress = useCallback(() => {
      navigate(SCREENS.LOGIN);
    }, [navigate]);

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('assets/images/boarding-background.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.content}>
            <View>
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
                The best simple place where you discover most wonderful
                furnitures and make your home beautiful
              </Text>
            </View>
          </View>
          <View style={styles.wrapper}>
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
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
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
  wrapper: {flex: 1 / 1.25, justifyContent: 'center'},
  button: {
    paddingHorizontal: 28,
    paddingVertical: 16,
    alignSelf: 'center',
  },
});

BoardingScreen.displayName = 'BoardingScreen';

export default BoardingScreen;
