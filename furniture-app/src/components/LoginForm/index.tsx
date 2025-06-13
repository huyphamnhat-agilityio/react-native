import {Controller, useForm} from 'react-hook-form';
import {memo, useCallback, useMemo, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

// Utils
import {clearErrorOnChange, isEnableSubmit} from 'src/utils';

// Themes
import {colors} from 'src/themes';

// Components
import {Button, TextInput} from '../common';

// Icons
import {EyeIcon} from '../icons';

// Constants
import {
  FORM_VALIDATION_MESSAGE,
  MEDIUM_DEVICE_HEIGHT,
  REGEX,
} from 'src/constants';

// Types & Interfaces
import {LoginFormData, StackNavigation} from 'src/interfaces';

export type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
  navigation: StackNavigation;
};

const height = Dimensions.get('window').height;

const REQUIRED_FIELDS: Array<keyof LoginFormData> = ['email', 'password'];

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

const LoginForm = memo(({onSubmit, navigation: {navigate}}: LoginFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const handleShowPassword = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors, dirtyFields, isSubmitting},
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

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    return !isEnableSubmit({
      requiredFields: REQUIRED_FIELDS,
      dirtyFields: dirtyFieldList,
      errors,
    });
  }, [dirtyFieldList, errors]);

  const navigateToRegister = useCallback(() => {
    navigate('Register');
  }, [navigate]);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, ...rest}, fieldState: {error}}) => (
            <TextInput
              font="NunitoSansNormal"
              label="Email"
              labelSize="xs"
              labelVariant="alternative"
              testID="email"
              onChangeText={handleInputChange('email', onChange)}
              isError={!!error?.message}
              errorMessage={error?.message}
              isDisabled={isSubmitting}
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
              RightContent={
                <EyeIcon
                  onPress={handleShowPassword}
                  testID="toggle-password"
                />
              }
              font="NunitoSansNormal"
              label="Password"
              secureTextEntry={isShowPassword}
              labelSize="xs"
              labelVariant="alternative"
              testID="password"
              onChangeText={handleInputChange('password', onChange)}
              isError={!!error?.message}
              errorMessage={error?.message}
              isDisabled={isSubmitting}
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
          disabled={isSubmitting}
        />

        <Button
          width="100%"
          title="Log in"
          titleSize="base"
          titleFont="NunitoSansSemiBold"
          rounded="md"
          testID="login"
          style={styles.button}
          disabled={isDisabled || isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          bgVariant="none"
          textVariant="outline"
          title="SIGN UP"
          titleSize="base"
          titleFont="NunitoSansSemiBold"
          onPress={navigateToRegister}
          style={styles.link}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  wrapper: {
    width: '100%',
    gap: height >= MEDIUM_DEVICE_HEIGHT ? 30 : 16,
    paddingVertical: 35,
    paddingHorizontal: 30,
    shadowColor: colors.shadow.primary,
    zIndex: 99,
    elevation: 10,
    borderColor: 'transparent',
  },
  link: {
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 12,
  },
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
