import {Controller, useForm} from 'react-hook-form';
import {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

// Utils
import {clearErrorOnChange} from 'src/utils';

// Themes
import {colors} from 'src/themes';

// Components
import {Button, TextInput} from '../common';

// Icons
import {EyeIcon} from '../icons';

// Constants
import {FORM_VALIDATION_MESSAGE, REGEX} from 'src/constants';

export type LoginFormData = {
  email: string;
  password: string;
};

export const LOGIN_FORM_VALIDATION = {
  EMAIL: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGE.INVALID('Email'),
    },
  },
  PASSWORD: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
    minLength: {
      value: 8,
      message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
    },
    maxLength: {
      value: 32,
      message: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
    },
    pattern: {
      value: REGEX.ALL_WHITE_SPACE,
      message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
    },
  },
};

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleInputChange = useCallback(
    (name: keyof LoginFormData, onChange: (value: string) => void) => {
      return (value: string) => {
        onChange(value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const onSubmit = useCallback((data: LoginFormData) => {
    // TODO: Integrate API later
    console.log('data', data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, ...rest}, fieldState: {error}}) => (
            <TextInput
              font="NuniToSansNormal"
              label="Email"
              labelSize="xs"
              labelVariant="alternative"
              onChangeText={handleInputChange('email', onChange)}
              isError={!!error?.message}
              errorMessage={error?.message}
              {...rest}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.EMAIL}
        />

        <Controller
          control={control}
          name="password"
          render={({field: {onChange, ...rest}, fieldState: {error}}) => (
            <TextInput
              RightContent={<EyeIcon />}
              font="NuniToSansNormal"
              label="Password"
              secureTextEntry
              labelSize="xs"
              labelVariant="alternative"
              onChangeText={handleInputChange('password', onChange)}
              isError={!!error?.message}
              errorMessage={error?.message}
              {...rest}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
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
          onPress={handleSubmit(onSubmit)}
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
