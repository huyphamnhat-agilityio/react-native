import {memo, useCallback} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert, StyleSheet, View} from 'react-native';

// Icons
import {LogoIcon} from 'src/components/icons';

// Components
import {Text} from 'src/components/common';

// Themes
import {colors} from 'src/themes';

// Services
import {register} from 'src/services';

// Types & Interfaces
import {AppStackScreenProps, RegisterFormData} from 'src/interfaces';
import {RegisterForm} from 'src/components';

const RegisterScreen = memo(({navigation}: AppStackScreenProps<'Register'>) => {
  const handleSubmit = useCallback(async (data: RegisterFormData) => {
    const errorMessage = await register(data);

    if (errorMessage) {
      Alert.alert(
        'Error',
        errorMessage,
        [
          {
            text: 'Ok',
          },
        ],
        {cancelable: true},
      );
    }
  }, []);
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.logo}>
        <View style={styles.stroke} />
        <LogoIcon />
        <View style={styles.stroke} />
      </View>
      <View style={styles.wrapper}>
        <Text
          font="MerriweatherBold"
          size="lg"
          textVariant="secondary"
          style={styles.title}>
          WELCOME
        </Text>
        <RegisterForm navigation={navigation} onSubmit={handleSubmit} />
      </View>
    </KeyboardAwareScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: 20,
  },
  logo: {
    marginTop: 20,
    paddingHorizontal: 30,
    height: 64,
    gap: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stroke: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
    borderRadius: 2,
  },
  wrapper: {
    gap: 20,
  },
  title: {
    lineHeight: 45,
    paddingLeft: 30,
  },
});

RegisterScreen.displayName = 'RegisterScreen';

export default RegisterScreen;
