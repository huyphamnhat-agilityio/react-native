import {Controller, useForm, UseFormTrigger} from 'react-hook-form';
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
import {RegisterFormData, StackNavigation} from 'src/interfaces';

export type RegisterFormProps = {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  navigation: StackNavigation;
};

const height = Dimensions.get('window').height;

const REQUIRED_FIELDS: Array<keyof RegisterFormData> = [
  'email',
  'password',
  'name',
  'confirmPassword',
];

export const REGISTER_FORM_VALIDATION = {
  NAME: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
    pattern: {
      value: REGEX.NAME,
      message: FORM_VALIDATION_MESSAGE.INVALID('Name'),
    },
  },
  EMAIL: {
    required: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGE.INVALID('Email'),
    },
  },
  PASSWORD: (trigger: UseFormTrigger<RegisterFormData>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
      pattern: {
        value: REGEX.PASSWORD,
        message: FORM_VALIDATION_MESSAGE.INVALID_PASSWORD,
      },
      validate: (value: string, {confirmPassword}: RegisterFormData) =>
        !confirmPassword ||
        value === confirmPassword ||
        trigger('confirmPassword'),
    };
  },
  CONFIRM_PASSWORD: (trigger: UseFormTrigger<RegisterFormData>) => {
    return {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Confirm password'),
      validate: (value: string, {password}: RegisterFormData) =>
        (value === password && trigger('password')) ||
        FORM_VALIDATION_MESSAGE.PASSWORD_NOT_MATCH,
    };
  },
};

const RegisterForm = memo(
  ({onSubmit, navigation: {navigate}}: RegisterFormProps) => {
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);

    const handleShowPassword = useCallback(() => {
      setIsShowPassword(!isShowPassword);
    }, [isShowPassword]);

    const handleShowConfirmPassword = useCallback(() => {
      setIsShowConfirmPassword(!isShowConfirmPassword);
    }, [isShowConfirmPassword]);

    const {
      control,
      handleSubmit,
      clearErrors,
      formState: {errors, dirtyFields, isSubmitting},
      trigger,
    } = useForm<RegisterFormData>({
      mode: 'onBlur',
      reValidateMode: 'onBlur',
    });

    const handleInputChange = useCallback(
      (name: keyof RegisterFormData, onChange: (value: string) => void) => {
        return (value: string) => {
          onChange(value);

          clearErrorOnChange(name, errors, clearErrors);
        };
      },
      [clearErrors, errors],
    );

    const dirtyFieldList = Object.keys(dirtyFields);

    const isDisabled = useMemo(() => {
      return !isEnableSubmit(REQUIRED_FIELDS, dirtyFieldList, errors);
    }, [dirtyFieldList, errors]);

    const handleToLogin = useCallback(() => {
      navigate('Login');
    }, [navigate]);

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, ...rest}, fieldState: {error}}) => (
              <TextInput
                font="NunitoSansNormal"
                label="Name"
                labelSize="xs"
                labelVariant="alternative"
                testID="name"
                onChangeText={handleInputChange('name', onChange)}
                isError={!!error?.message}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                {...rest}
              />
            )}
            rules={REGISTER_FORM_VALIDATION.NAME}
          />
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
            rules={REGISTER_FORM_VALIDATION.EMAIL}
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
            rules={REGISTER_FORM_VALIDATION.PASSWORD(trigger)}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onChange, ...rest}, fieldState: {error}}) => (
              <TextInput
                RightContent={
                  <EyeIcon
                    onPress={handleShowConfirmPassword}
                    testID="toggle-password"
                  />
                }
                font="NunitoSansNormal"
                label="Confirm Password"
                secureTextEntry={isShowConfirmPassword}
                labelSize="xs"
                labelVariant="alternative"
                testID="confirm-password"
                onChangeText={handleInputChange('confirmPassword', onChange)}
                isError={!!error?.message}
                errorMessage={error?.message}
                isDisabled={isSubmitting}
                {...rest}
              />
            )}
            rules={REGISTER_FORM_VALIDATION.CONFIRM_PASSWORD(trigger)}
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
            title="Sign up"
            titleSize="base"
            titleFont="NunitoSansSemiBold"
            rounded="md"
            testID="sign-up"
            style={styles.button}
            disabled={isDisabled || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />

          <Button
            bgVariant="none"
            textVariant="outline"
            title="LOGIN"
            titleSize="base"
            titleFont="NunitoSansSemiBold"
            onPress={handleToLogin}
            style={styles.link}
            disabled={isSubmitting}
          />
        </View>
      </View>
    );
  },
);

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

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
