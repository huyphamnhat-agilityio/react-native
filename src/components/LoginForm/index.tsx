import {StyleSheet, View} from 'react-native';
import {colors} from 'src/themes';
import {Button, TextInput} from '../common';
import {EyeIcon} from '../icons';

const LoginForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          font="NuniToSansNormal"
          label="Email"
          labelSize="xs"
          labelVariant="alternative"
        />

        <TextInput
          font="NuniToSansNormal"
          label="Password"
          secureTextEntry
          labelSize="xs"
          labelVariant="alternative"
          RightContent={<EyeIcon />}
        />

        <Button
          bgVariant="none"
          textVariant="outline"
          title="Forgot Password"
          titleSize="base"
          titleFont="NunitoSansSemiBold"
          style={styles.link}
        />

        <Button
          width="100%"
          title="Log in"
          titleSize="base"
          titleFont="NunitoSansSemiBold"
          rounded="md"
          style={styles.button}
        />

        <Button
          bgVariant="none"
          textVariant="outline"
          title="SIGN UP"
          titleSize="base"
          titleFont="NunitoSansSemiBold"
          style={styles.link}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
    gap: 35,
    paddingVertical: 35,
    paddingHorizontal: 30,
    shadowColor: colors.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  link: {
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 12,
  },
});
export default LoginForm;
