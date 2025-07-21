import { memo, useCallback, useMemo } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

// Types
import { User } from "@/interfaces";

// Themes
import { borderRadius, colors } from "@/themes";

// Button
import { Button, Input } from "@/components/common";

// Utils
import { clearErrorOnChange, isEnableSubmit } from "@/utils";

// Constants
import { FORM_VALIDATION_MESSAGES, REGEX } from "@/constants";

export type EditUserFormData = Pick<User, "email" | "name" | "phone">;

export type EditProfileFormProps = {
  data?: Partial<User>;
  imageUri?: string;
  onSubmit: (data: EditUserFormData) => Promise<void>;
  onOpenSheet?: () => void;
  isDirty?: boolean;
};

const REQUIRED_FIELDS: (keyof EditUserFormData)[] = ["name", "phone", "email"];

const EDIT_USER_FORM_VALIDATION: Record<
  string,
  Omit<
    RegisterOptions<EditUserFormData>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >
> = {
  NAME: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Name"),
    pattern: {
      value: REGEX.NAME,
      message: FORM_VALIDATION_MESSAGES.INVALID("Name"),
    },
  },
  PHONE: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Phone number"),
    pattern: {
      value: REGEX.PHONE,
      message: FORM_VALIDATION_MESSAGES.INVALID("Phone"),
    },
  },
  EMAIL: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Email"),
    pattern: {
      value: REGEX.EMAIL,
      message: FORM_VALIDATION_MESSAGES.INVALID("Email"),
    },
  },
};

const EditProfileForm = memo(
  ({
    data,
    imageUri,
    onOpenSheet,
    onSubmit,
    isDirty = false,
  }: EditProfileFormProps) => {
    const {
      control,
      handleSubmit,
      formState: { errors, dirtyFields, isSubmitting },
      clearErrors,
    } = useForm<EditUserFormData>({
      defaultValues: {
        name: data?.name ?? "",
        email: data?.email ?? "",
        phone: data?.phone ?? "",
      },
      mode: "onBlur",
      reValidateMode: "onBlur",
    });

    const handleInputChange = useCallback(
      (name: keyof EditUserFormData, onChange: (value: string) => void) => {
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
        requirePartial: true,
      });
    }, [dirtyFieldList, errors]);
    return (
      <View style={styles.wrapper}>
        <View style={styles.formWrapper}>
          <Image
            source={{ uri: imageUri || data?.avatar }}
            style={styles.avatar}
          />
          <Button
            title="Change Avatar"
            rounded={3}
            style={styles.avatarButton}
            onPress={onOpenSheet}
            disabled={isSubmitting}
          />
          <Controller
            control={control}
            name="name"
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                label="Name"
                labelVariant="secondary"
                labelSize={3.5}
                labelFont="Montserrat_400Regular"
                labelDistance={8}
                inputSize={4}
                maxLength={50}
                inputVariant="quaternary"
                style={styles.textInput}
                isDisabled={isSubmitting}
                isError={!!error?.message}
                errorMessage={error?.message}
                onChangeText={handleInputChange("name", onChange)}
                {...rest}
              />
            )}
            rules={EDIT_USER_FORM_VALIDATION.NAME}
          />

          <Controller
            control={control}
            name="phone"
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                label="Phone"
                labelVariant="secondary"
                labelSize={3.5}
                labelFont="Montserrat_400Regular"
                labelDistance={8}
                inputSize={4}
                inputMode="tel"
                inputVariant="quaternary"
                maxLength={12}
                style={styles.textInput}
                isDisabled={isSubmitting}
                isError={!!error?.message}
                errorMessage={error?.message}
                onChangeText={handleInputChange("phone", onChange)}
                {...rest}
              />
            )}
            rules={EDIT_USER_FORM_VALIDATION.PHONE}
          />

          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, ...rest },
              fieldState: { error },
            }) => (
              <Input
                label="Email"
                labelVariant="secondary"
                labelSize={3.5}
                labelFont="Montserrat_400Regular"
                labelDistance={8}
                inputSize={4}
                maxLength={50}
                inputVariant="quaternary"
                style={styles.textInput}
                isDisabled={isSubmitting}
                isError={!!error?.message}
                errorMessage={error?.message}
                onChangeText={handleInputChange("email", onChange)}
                {...rest}
              />
            )}
            rules={EDIT_USER_FORM_VALIDATION.EMAIL}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Save"
            titleFont="Montserrat_600SemiBold"
            titleSize={4.5}
            style={styles.button}
            rounded="full"
            disabled={(isDisabled && !isDirty) || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  avatarButton: {
    marginHorizontal: "auto",
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
    paddingTop: 12,
    gap: 12,
    justifyContent: "space-between",
    paddingBottom: "4%",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    marginHorizontal: "auto",
  },
  formWrapper: {
    gap: 16,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
  textInput: {
    width: "100%",
    borderBottomColor: colors.gray_50,
    borderBottomWidth: 0.5,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
  },
});

EditProfileForm.displayName = "EditProfileForm";
export default EditProfileForm;
