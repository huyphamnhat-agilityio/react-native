import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

// Components
import { Button, Input, Text } from "@/components/common";

// Themes
import { border, borderRadius } from "@/themes";

// Constants
import { FORM_VALIDATION_MESSAGES, REGEX } from "@/constants";
import { LoginFormData } from "@/interfaces";
import { clearErrorOnChange, isEnableSubmit } from "@/utils";

const REQUIRED_FIELDS: (keyof LoginFormData)[] = ["email", "password"];

const LOGIN_FORM_VALIDATION = {
  EMAIL: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Email"),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGES.INVALID("Email"),
    },
  },
  PASSWORD: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Password"),
    minLength: {
      value: 8,
      message: FORM_VALIDATION_MESSAGES.MIN_LENGTH("Password", 8),
    },
    maxLength: {
      value: 32,
      message: FORM_VALIDATION_MESSAGES.MAX_LENGTH("Password", 32),
    },
    pattern: {
      value: REGEX.ALL_WHITE_SPACE,
      message: FORM_VALIDATION_MESSAGES.ALL_WHITE_SPACE("Password"),
    },
  },
};

export type LoginFormProps = {
  onSubmit: (data: LoginFormData) => void;
};

const LoginForm = memo(({ onSubmit }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<LoginFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
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

  return (
    <View style={styles.formWrapper}>
      <Text
        font="Montserrat_400Regular"
        size={4}
        textVariant="white"
        style={styles.text}
      >
        Login to your account
      </Text>

      <View style={{ display: "flex", gap: 16 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              placeholder="Email"
              font="Montserrat_400Regular"
              inputVariant="white"
              inputSize={4.5}
              wrapperStyle={styles.input}
              onChangeText={handleInputChange("email", onChange)}
              isError={!!error?.message}
              errorMessage={error?.message}
              isDisabled={isSubmitting}
              errorStyle={styles.errorMessage}
              {...rest}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.EMAIL}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              placeholder="Password"
              font="Montserrat_400Regular"
              inputVariant="white"
              inputSize={4.5}
              wrapperStyle={styles.input}
              secureTextEntry
              onChangeText={handleInputChange("password", onChange)}
              isError={!!error?.message}
              errorMessage={error?.message}
              isDisabled={isSubmitting}
              errorStyle={styles.errorMessage}
              {...rest}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />
      </View>

      <Button
        title="Login"
        variant="secondary"
        titleFont="Montserrat_500Medium"
        titleSize={4}
        rounded={6}
        style={styles.button}
        disabled={isDisabled || isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      <Text
        font="Montserrat_400Regular"
        textVariant="white"
        size={4.5}
        style={styles.text}
      >
        Forgot your password?
      </Text>

      <Text
        font="Montserrat_400Regular"
        textVariant="white"
        size={4.5}
        style={styles.text}
      >
        Don&apos;t have an account?{" "}
        <Text
          font="Montserrat_600SemiBold"
          textVariant="white"
          size={4.5}
          style={styles.text}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  formWrapper: {
    display: "flex",
    gap: 40,
    paddingHorizontal: 32,
  },
  text: {
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: border.white,
    borderRadius: borderRadius[6],
    paddingLeft: 16,
    paddingVertical: 12,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: borderRadius[6],
  },
  errorMessage: {
    paddingLeft: 12,
  },
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
